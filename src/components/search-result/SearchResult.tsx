import { useEffect, useState } from 'react';
import styles from './SearchResult.module.css';
import fetchData, { type DataResult } from './ApiRequest';

type Props = {
  searchText: string;
};

type State = {
  data: DataResult[];
  isLoading: boolean;
  error: string | null;
};

export default function SearchResult(props: Props) {
  const [state, setState] = useState<State>({
    data: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const runFetch = async (): Promise<void> => {
      try {
        setState({ ...state, isLoading: true });
        const result: DataResult[] = await fetchData(props.searchText);
        setState({ data: result, isLoading: false, error: null });
      } catch (err) {
        if (err instanceof Error) {
          setState({ data: [], error: err.message, isLoading: false });
          console.log('>>> Error: ', err);
        } else {
          setState({ data: [], error: 'Unexpected error', isLoading: false });
          console.log('>>> Unknown error: ', err);
        }
      }
    };
    runFetch();
  }, [state, props.searchText]);

  return (
    <>
      <div className={styles.search_result}>
        {state.isLoading && <p>Loading...</p>}
        {state.error && <p>Error Message: {state.error}</p>}
        {!state.isLoading && !state.error && (
          <div className={styles.row}>
            <div className={styles.cell}>
              <strong>Name</strong>
            </div>
            <div className={styles.cell}>
              <strong>Description</strong>
            </div>
          </div>
        )}
        {!state.isLoading &&
          !state.error &&
          state.data.map((item, index) => {
            return (
              <div className={styles.row} key={index}>
                <div className={styles.cell}>{item.name}</div>
                <div className={styles.cell}>
                  Height: {item.height}; Weight: {item.weight}
                </div>
              </div>
            );
          })}
        {!state.isLoading && !state.error && state.data.length === 0 && (
          <div className={styles.row} key={0}>
            No data...
          </div>
        )}
      </div>
    </>
  );
}
