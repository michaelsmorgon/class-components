import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchSection from './SearchSection';

describe('SearchSection component', (): void => {
  const LS_KEY = 'searchRow';
  const mockOnSearch = vi.fn();
  const PLACEHOLDER = 'Type text here...';
  const BUTTON = { name: /search/i };

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockReset();
  });

  it('renders search input and search button', () => {
    render(<SearchSection onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByRole('button', BUTTON)).toBeInTheDocument();
  });

  it('displays saved search data from localStorage on mount', () => {
    localStorage.setItem(LS_KEY, 'pikachu');
    render(<SearchSection onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    expect(input.value).toBe('pikachu');
  });

  it('shows empty input when no saved term exists', () => {
    render(<SearchSection onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('updates input value when user types', () => {
    render(<SearchSection onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    expect(input.value).toBe('bulbasaur');
  });

  it('saves search term to localStorage when search button is clicked', () => {
    render(<SearchSection onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    const button = screen.getByRole('button', BUTTON) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'charmander' } });
    fireEvent.click(button);

    expect(localStorage.getItem(LS_KEY)).toBe('charmander');
  });

  it('Trims whitespace from search input before saving', () => {
    render(<SearchSection onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    const button = screen.getByRole('button', BUTTON);

    fireEvent.change(input, { target: { value: '   squirtle   ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('squirtle');
    expect(localStorage.getItem(LS_KEY)).toBe('squirtle');
  });

  it('retrieves saved value from localStorage on mount', () => {
    localStorage.setItem(LS_KEY, 'pikachu');
    render(<SearchSection onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    expect(input.value).toBe('pikachu');
  });

  it('overwrites old value in localStorage on new search', async () => {
    localStorage.setItem(LS_KEY, 'pikachu');
    render(<SearchSection onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    const button = screen.getByRole('button', BUTTON);

    fireEvent.change(input, { target: { value: 'squirtle' } });
    fireEvent.click(button);

    expect(localStorage.getItem(LS_KEY)).toBe('squirtle');
  });
});
