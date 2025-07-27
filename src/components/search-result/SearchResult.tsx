import { useEffect, useState } from 'react';
import styles from './SearchResult.module.css';
import fetchData, { type DataResult } from './ApiRequest';
import DetailItem from './DetailItem';

type Props = {
  searchText: string;
};

export default function SearchResult(props: Props) {
  const [data, setData] = useState<DataResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runFetch = async (): Promise<void> => {
      try {
        setError(null);
        setIsLoading(true);
        const result: DataResult[] = await fetchData(props.searchText);
        setData(result);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setIsLoading(false);
          setError(err.message);
          console.log('>>> Error: ', err);
        } else {
          setIsLoading(false);
          setError('Unexpected error');
          console.log('>>> Unknown error: ', err);
        }
      }
    };
    runFetch();
  }, [props.searchText]);

  return (
    <>
      <div className={styles.search_result}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error Message: {error}</p>}
        {!isLoading && !error && (
          <div className={styles.row}>
            <div className={styles.cell}>
              <strong>Name</strong>
            </div>
            <div className={styles.cell}>
              <strong>Description</strong>
            </div>
          </div>
        )}
        {!isLoading &&
          !error &&
          data.map((item, index) => {
            return <DetailItem item={item} key={index} />;
          })}
        {!isLoading && !error && data.length === 0 && (
          <div className={styles.row} key={0}>
            No data...
          </div>
        )}
      </div>
    </>
  );
}
