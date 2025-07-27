import { describe, it, expect, type Mock, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import SearchResult from './SearchResult';
import fetchData, { type DataResult } from './ApiRequest';
import { BrowserRouter } from 'react-router-dom';

vi.mock('./ApiRequest', async () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockedFetchData = fetchData as Mock;

describe('SearchResult component', (): void => {
  const mockData: DataResult[] = [
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
    {
      name: 'charmander',
      height: 6,
      weight: 85,
      sprites: {
        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
          },
        },
      },
    },
    {
      name: 'pikachu',
      height: 4,
      weight: 99,
      sprites: {
        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
          },
        },
      },
    },
  ];

  beforeEach(() => {
    mockedFetchData.mockReset();
  });

  it('Renders correct number of items when data is provided', async () => {
    mockedFetchData.mockResolvedValueOnce(mockData);
    render(
      <BrowserRouter>
        <SearchResult searchText="" handleDetail={() => {}} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    const rowCount = screen.getAllByText(/Height:/i);
    expect(rowCount.length).toBe(3);
  });

  it('displays "no results" message when data array is empty', async () => {
    mockedFetchData.mockResolvedValueOnce([]);
    render(
      <BrowserRouter>
        <SearchResult searchText="" handleDetail={() => {}} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching data', async () => {
    mockedFetchData.mockResolvedValueOnce(mockData);
    render(
      <BrowserRouter>
        <SearchResult searchText="" handleDetail={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });
  });

  it('correctly displays item names and descriptions', async () => {
    mockedFetchData.mockResolvedValueOnce([
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
    ]);
    render(
      <BrowserRouter>
        <SearchResult searchText="" handleDetail={() => {}} />
      </BrowserRouter>
    );

    expect(
      await screen.findByRole('heading', { level: 2, name: /bulbasaur/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/height: 7/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight: 69/i)).toBeInTheDocument();
  });

  it('handles missing or undefined data gracefully', async () => {
    mockedFetchData.mockResolvedValueOnce([
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
    ]);
    render(
      <BrowserRouter>
        <SearchResult searchText="" handleDetail={() => {}} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/height: NaN/i)).toBeInTheDocument();
      expect(screen.getByText(/weight: NaN/i)).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    mockedFetchData.mockRejectedValueOnce(new Error('Test error'));
    render(
      <BrowserRouter>
        <SearchResult searchText="" handleDetail={() => {}} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Error Message: test error/i)
      ).toBeInTheDocument();
    });
  });

  it('shows appropriate error for different HTTP status codes (4xx, 5xx)', async () => {
    mockedFetchData.mockRejectedValueOnce(new Error('API error: 404'));
    render(
      <BrowserRouter>
        <SearchResult searchText="" handleDetail={() => {}} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Error Message: api error: 404/i)
      ).toBeInTheDocument();
    });
  });
});
