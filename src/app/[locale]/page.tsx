import MainContent from '@/components/main-content/MainContent';
import { API_URL, COUNT_PER_PAGE } from '../utils/constants';
import { DataResult, Response, Result } from '../utils/types';

async function getInitialData(): Promise<Result> {
  const res = await fetch(`${API_URL}?limit=${COUNT_PER_PAGE}`);
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

export default async function Page() {
  const initialData = await getInitialData();

  return <MainContent initialData={initialData} />;
}
