import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchSection from './SearchSection';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/Store';

const mockRefetch = vi.fn();
vi.mock('../../services/api', async () => {
  const actual = await vi.importActual('../../services/api');
  return {
    ...actual,
    useGetItemsQuery: vi.fn(() => ({
      refetch: mockRefetch,
    })),
  };
});
// import * as api from '../../services/api';

// const mockUseGetItemsQuery = vi.mocked(api.useGetItemsQuery);
// const mockUseGetItemDetailQuery = vi.mocked(api.useGetItemDetailQuery);

describe('SearchSection component', (): void => {
  const LS_KEY = 'searchRow';
  const mockOnSearch = vi.fn();
  const PLACEHOLDER = 'Type text here...';
  const SEARCH_BTN = { name: /search/i };
  const REFRESH_BTN = { name: /refresh/i };

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockReset();
    mockRefetch.mockReset();
    // mockUseGetItemDetailQuery.mockReturnValue({
    //   data: undefined,
    //   error: undefined,
    //   isLoading: false,
    //   refetch: vi.fn(),
    // });
  });

  const renderComp = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchSection onSearch={mockOnSearch} />
        </BrowserRouter>
      </Provider>
    );

  it('renders search input and search button', () => {
    renderComp();
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByRole('button', SEARCH_BTN)).toBeInTheDocument();
    expect(screen.getByRole('button', REFRESH_BTN)).toBeInTheDocument();
  });

  it('displays saved search data from localStorage on mount', () => {
    localStorage.setItem(LS_KEY, 'pikachu');
    renderComp();
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    expect(input.value).toBe('pikachu');
  });

  it('shows empty input when no saved term exists', () => {
    renderComp();
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('updates input value when user types', () => {
    renderComp();
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    expect(input.value).toBe('bulbasaur');
  });

  it('saves search term to localStorage when search button is clicked', () => {
    renderComp();
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    const button = screen.getByRole('button', SEARCH_BTN) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'charmander' } });
    fireEvent.click(button);

    expect(localStorage.getItem(LS_KEY)).toBe('charmander');
  });

  it('Trims whitespace from search input before saving', () => {
    renderComp();
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    const button = screen.getByRole('button', SEARCH_BTN);

    fireEvent.change(input, { target: { value: '   squirtle   ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('squirtle');
    expect(localStorage.getItem(LS_KEY)).toBe('squirtle');
  });

  it('retrieves saved value from localStorage on mount', async () => {
    localStorage.setItem(LS_KEY, 'pikachu');
    renderComp();
    await waitFor(() => {
      const input = screen.getByPlaceholderText(
        PLACEHOLDER
      ) as HTMLInputElement;
      expect(input.value).toBe('pikachu');
    });
  });

  it('overwrites old value in localStorage on new search', async () => {
    localStorage.setItem(LS_KEY, 'pikachu');
    renderComp();
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    const button = screen.getByRole('button', SEARCH_BTN);

    fireEvent.change(input, { target: { value: 'squirtle' } });
    fireEvent.click(button);

    expect(localStorage.getItem(LS_KEY)).toBe('squirtle');
  });

  it('calls refetch when refresh button is clicked', () => {
    renderComp();
    const refreshButton = screen.getByRole('button', REFRESH_BTN);
    fireEvent.click(refreshButton);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
