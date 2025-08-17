import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/Store';
import * as api from '../../services/api';

const mockUseGetItemsQuery = vi.spyOn(api, 'useGetItemsQuery');

describe('Main component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderComp = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </Provider>
    );

  it('makes initial API call on mount', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: vi.fn(),
    });

    renderComp();

    expect(mockUseGetItemsQuery).toHaveBeenCalledWith({
      page: 1,
      searchText: '',
    });
  });

  it('shows loading state during API call', async () => {
    mockUseGetItemsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      refetch: vi.fn(),
    });

    renderComp();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
