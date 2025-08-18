import MainContent from '@/components/main-content/MainContent';
import { API_URL, COUNT_PER_PAGE } from '../utils/constants';
import {
  AdditionalResponse,
  DataResult,
  Response,
  Result,
} from '../utils/types';

async function getInitialData(search: string | undefined): Promise<Result> {
  if (search) {
    const res = await fetch(`${API_URL}/${search}`, { cache: 'force-cache' });
    const data: AdditionalResponse = await res.json();
    return { count: 1, data: [data] };
  } else {
    const res = await fetch(`${API_URL}?limit=${COUNT_PER_PAGE}`, {
      cache: 'force-cache',
    });
    const data: Response = await res.json();

    if (Object.keys(data).length === 0) {
      return { count: 0, data: [] };
    } else {
      const result = await Promise.all(
        data.results.map(async (value) => {
          const response = await fetch(value.url);
          return await response.json();
        })
      )
        .then((results) => {
          const dataResult: DataResult[] = [];
          results.map((value) => dataResult.push({ ...value }));
          return dataResult;
        })
        .catch(() => {
          return [];
        });

      return { count: result.length, data: result };
    }
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const sp = await searchParams;
  const search = sp.search;
  const initialData = await getInitialData(search);

  return <MainContent initialData={initialData} />;
}
