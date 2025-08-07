import { COUNT_PER_PAGE } from '../../utils/constants';
import type {
  DataResult,
  Response,
  Result,
  AdditionalResponse,
} from '../../utils/types';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

const getDetailInfo = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  checkRes(res);
  const data: DataResult = await res.json();
  return data;
};

const fetchData = async (
  searchText: string,
  page?: number
): Promise<Result> => {
  const currentPage = page || 1;
  if (searchText) {
    const res = await fetch(`${API_URL}/${searchText}`);
    checkRes(res);
    const data: AdditionalResponse = await res.json();
    return { count: 1, data: [data] };
  } else {
    const res = await fetch(
      `${API_URL}?offset=${(currentPage - 1) * COUNT_PER_PAGE}&limit=${COUNT_PER_PAGE}`
    );
    checkRes(res);
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
};

const checkRes = (res: globalThis.Response): void => {
  if (res.status >= 400 && res.status < 500) {
    console.log('>>> Client Error:', res.status);
  } else if (res.status >= 500) {
    console.log('>>> Server Error:', res.status);
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
};

export default fetchData;
export { getDetailInfo };
