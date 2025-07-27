import { describe, expect, it, vi, beforeEach } from 'vitest';
import fetchData from './ApiRequest';
import {
  BULBASAUR_NAME,
  PIKACHU_NAME,
  URL,
  mockFetch,
  pikachuData,
  bulbasaurData,
} from '../../test-utils/constants';

globalThis.fetch = mockFetch as ReturnType<typeof vi.fn>;

const mockListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    { name: PIKACHU_NAME, url: URL + PIKACHU_NAME },
    { name: BULBASAUR_NAME, url: URL + BULBASAUR_NAME },
  ],
};

const mockSuccessResponse = {
  name: PIKACHU_NAME,
  height: 4,
  weight: 60,
};

beforeEach(() => {
  mockFetch.mockReset();
});

describe('fetchData', () => {
  it('returns data when searchText is provided (single item)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockSuccessResponse,
    });

    const result = await fetchData(PIKACHU_NAME);
    expect(mockFetch).toHaveBeenCalledWith(URL + PIKACHU_NAME + '?limit=9');
    expect(result).toEqual([mockSuccessResponse]);
  });

  it('returns list of data when no searchText is provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockListResponse,
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => pikachuData,
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => bulbasaurData,
    });

    const result = await fetchData('');
    expect(result).toEqual([pikachuData, bulbasaurData]);
  });

  it('returns empty array if results is empty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    const result = await fetchData('');
    expect(result).toEqual([]);
  });

  it('throws error on 404 response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    await expect(fetchData('')).rejects.toThrow('API error: 404');
  });
});
