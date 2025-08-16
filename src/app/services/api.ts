import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, COUNT_PER_PAGE } from '@/app/utils/constants';
import type { DataResult, Response, Result } from '@/app/utils/types';

export const api = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getItems: builder.query<Result, { page: number; searchText: string }>({
      queryFn: async (args, _queryApi, _extraOptions, baseQuery) => {
        const { page = 1, searchText = '' } = args;
        if (searchText) {
          const result = await baseQuery(`/${searchText}`);
          if (result.error) {
            return { error: result.error };
          }
          const data = result.data as DataResult;
          return {
            data: {
              count: 1,
              data: [data],
            },
          };
        }

        const offset = (page - 1) * COUNT_PER_PAGE;
        const result = await baseQuery(
          `?offset=${offset}&limit=${COUNT_PER_PAGE}`
        );
        if (result.error) {
          return { error: result.error };
        }
        const data = result.data as Response;

        if (!data.results.length) {
          return {
            data: {
              count: 0,
              data: [],
            },
          };
        }

        const detailPromises = data.results.map((item) => {
          const relativePath = item.url.replace(API_URL, '');
          return baseQuery(relativePath);
        });

        const detailResults = await Promise.all(detailPromises);

        const finalResults: DataResult[] = [];
        for (const result of detailResults) {
          if ('data' in result) {
            finalResults.push(result.data as DataResult);
          }
        }

        return {
          data: {
            count: finalResults.length,
            data: finalResults,
          },
        };
      },
    }),
    getItemDetail: builder.query<DataResult, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetItemDetailQuery } = api;
