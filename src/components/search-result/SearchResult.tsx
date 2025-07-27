import { useEffect, useState } from 'react';
import styles from './SearchResult.module.css';
import fetchData, { type DataResult } from './ApiRequest';
import DetailItem from '../detail-item/DetailItem';
import { useParams } from 'react-router-dom';

type Props = {
  searchText: string;
  handleDetail: (data: DataResult | null) => void;
};

export default function SearchResult(props: Props) {
  const [data, setData] = useState<DataResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

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

  const detailData = data.find((item) => item.name === id) || null;
  props.handleDetail(detailData);

  return (
    <>
      <div className={styles.search_result}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error Message: {error}</p>}
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
