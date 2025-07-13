const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export type DataResult = {
  name: string;
  height: number;
  weight: number;
};

type Response = {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      name: string;
      url: string;
    },
  ];
};

type AdditionalResponse = {
  name: string;
  weight: number;
  height: number;
};

const fetchData = async (searchText: string): Promise<DataResult[]> => {
  if (searchText) {
    const res = await fetch(API_URL + `/${searchText}`);
    checkRes(res);
    const data: AdditionalResponse = await res.json();
    return [{ ...data }];
  } else {
    const res = await fetch(API_URL);
    checkRes(res);
    const data: Response = await res.json();

    if (Object.keys(data).length === 0) {
      return [];
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

      return result;
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
