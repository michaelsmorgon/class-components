import { useEffect, useState } from 'react';
import styles from './SearchResult.module.css';
import fetchData, {
  getDetailInfo,
  type DataResult,
  type Result,
} from './ApiRequest';
import DetailItem from '../detail-item/DetailItem';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { COUNT_PER_PAGE } from '../../utils/constants';

type Props = {
  searchText: string;
  handleDetail: (data: DataResult | null) => void;
};

export default function SearchResult(props: Props) {
  const [data, setData] = useState<Result>({ count: 0, data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { handleDetail } = props;

  useEffect(() => {
    const runFetch = async (): Promise<void> => {
      try {
        setError(null);
        setIsLoading(true);
        const result: Result = await fetchData(
          props.searchText,
          parseInt(page)
        );
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
  }, [props.searchText, page]);

  useEffect(() => {
    const runFetch = async (): Promise<void> => {
      try {
        if (id) {
          handleDetail(null);
          setIsLoadingDetail(true);
          const result: DataResult = await getDetailInfo(id);
          handleDetail(result);
          setIsLoadingDetail(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.log('>>> Error: ', err);
        } else {
          setError('Unexpected error');
          console.log('>>> Unknown error: ', err);
        }
      }
    };
    runFetch();
  }, [handleDetail, id]);

  if (isLoading || isLoadingDetail) {
    return (
      <div className={styles.search_result}>
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.search_result}>
        <p>Error Message: {error}</p>
      </div>
    );
  }

  if (data.count === 0) {
    return (
      <div className={styles.search_result}>
        <div className={styles.row}>No data...</div>
      </div>
    );
  }

  return (
    <div className={styles.search_result}>
      {data.data.map((item, index) => {
        return <DetailItem item={item} key={index} />;
      })}
      {data.count >= COUNT_PER_PAGE && <Pagination page={page} />}
    </div>
  );
}
