import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MainContent from './MainContent';
import fetchData from '../search-result/ApiRequest';
import { pikachuData } from '../../test-utils/constants';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/Store';

vi.mock('../search-result/ApiRequest', () => ({
  default: vi.fn(),
}));

describe('Main component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('makes initial API call on mount', async () => {
    (fetchData as ReturnType<typeof vi.fn>).mockResolvedValueOnce(pikachuData);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalled();
    });
  });

  it('shows loading state during API call', async () => {
    (fetchData as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
