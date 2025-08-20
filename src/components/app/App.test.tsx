import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import fetchData from '../search-result/ApiRequest';
import { pikachuData } from '../../test-utils/constants';

vi.mock('../search-result/ApiRequest', () => ({
  default: vi.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('makes initial API call on mount', async () => {
    (fetchData as ReturnType<typeof vi.fn>).mockResolvedValueOnce(pikachuData);

    render(<App />);

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalled();
    });
  });

  it('shows loading state during API call', async () => {
    (fetchData as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(() => {})
    );

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
