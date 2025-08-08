import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import SearchResult from './SearchResult';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/Store';
import { mockData } from '../../test-utils/constants';

vi.mock('../../services/api', async () => {
  const actual = await vi.importActual('../../services/api');
  return {
    ...actual,
    useGetItemsQuery: vi.fn(),
    useGetItemDetailQuery: vi.fn(),
  };
});

import * as api from '../../services/api';

const mockUseGetItemsQuery = vi.mocked(api.useGetItemsQuery);
const mockUseGetItemDetailQuery = vi.mocked(api.useGetItemDetailQuery);

describe('SearchResult component', (): void => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGetItemDetailQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  const renderComp = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResult searchText="" handleDetail={() => {}} />
        </BrowserRouter>
      </Provider>
    );

  it('Renders correct number of items when data is provided', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });

    renderComp();

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    const rowCount = screen.getAllByText(/Height:/i);
    expect(rowCount.length).toBe(3);
  });

  it('displays "no results" message when data array is empty', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: { count: 0, data: [] },
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });

    renderComp();

    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching data', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: vi.fn(),
    });

    const { rerender } = renderComp();

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    mockUseGetItemsQuery.mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });

    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResult searchText="" handleDetail={() => {}} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });
  });

  it('correctly displays item names and descriptions', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: {
        count: 1,
        data: [
          {
            name: 'bulbasaur',
            height: 7,
            weight: 69,
            sprites: {
              other: {
                dream_world: {
                  front_default:
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
                },
              },
            },
          },
        ],
      },
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });
    renderComp();

    expect(
      await screen.findByRole('heading', { level: 2, name: /bulbasaur/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/height: 7/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight: 69/i)).toBeInTheDocument();
  });

  it('handles missing or undefined data gracefully', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: {
        count: 1,
        data: [
          {
            name: '',
            height: NaN,
            weight: NaN,
            sprites: {
              other: {
                dream_world: {
                  front_default: '',
                },
              },
            },
          },
        ],
      },
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });
    renderComp();

    await waitFor(() => {
      expect(screen.getByText(/height: NaN/i)).toBeInTheDocument();
      expect(screen.getByText(/weight: NaN/i)).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: undefined,
      error: { status: 500, data: 'Test error' },
      isLoading: false,
      refetch: vi.fn(),
    });
    renderComp();

    await waitFor(() => {
      expect(screen.getByText(/Test error/i)).toBeInTheDocument();
    });
  });

  it('shows appropriate error for different HTTP status codes (4xx, 5xx)', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: undefined,
      error: { status: 404, data: 'API error: 404' },
      isLoading: false,
      refetch: vi.fn(),
    });
    renderComp();

    await waitFor(() => {
      expect(screen.getByText(/api error: 404/i)).toBeInTheDocument();
    });
  });

  // it('handleRefetch calls refetch', async () => {
  //   const refetchMock = vi.fn();
  //   mockUseGetItemsQuery.mockReturnValue({
  //     data: mockData,
  //     error: undefined,
  //     isLoading: false,
  //     refetch: refetchMock,
  //   });

  //   renderComp();

  //   const btn = screen.getByRole('button', { name: '🔄 Refresh' });
  //   fireEvent.click(btn);
  //   expect(refetchMock).toHaveBeenCalled();
  // });

  it('renders Flyout if selectedItems exists', () => {
    store.dispatch({ type: 'items/addItem', payload: mockData.data[0] });

    mockUseGetItemsQuery.mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
      refetch: vi.fn(),
    });

    renderComp();

    expect(screen.getByText(/download/i)).toBeInTheDocument();
  });
});
