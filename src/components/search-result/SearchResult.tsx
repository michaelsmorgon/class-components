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
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteItemAll,
  selectSelectedItems,
} from '../../redux/slices/ItemSlice';
import Flyout from '../flyout/Flyout';

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
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectSelectedItems);

  const handleUnselectAll = () => {
    dispatch(deleteItemAll());
  };

  const handleDownload = () => {
    const csvRows = [
      ['Name', 'Height', 'Weight', 'Image URL'],
      ...selectedItems.map((item: DataResult) => [
        item.name,
        item.height,
        item.weight,
        item.sprites.other.dream_world.front_default,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedItems.length}_items.csv`;
    link.click();
  };

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

  return (
    <>
      <div className={styles.search_result}>
        <div className={styles.loading}>
          {isLoading && <p>Loading...</p>}
          {isLoadingDetail && <p>Loading...</p>}
        </div>
        {error && <p>Error Message: {error}</p>}
        {!isLoading &&
          !error &&
          data.data.map((item, index) => {
            return <DetailItem item={item} key={index} />;
          })}
        {!isLoading && !error && data.count >= COUNT_PER_PAGE && (
          <Pagination page={page} />
        )}
        {!isLoading && !error && data.count === 0 && (
          <div className={styles.row} key={0}>
            No data...
          </div>
        )}
      </div>
      {selectedItems.length > 0 && (
        <Flyout
          selectCount={selectedItems.length}
          onUnselectAll={handleUnselectAll}
          onDownload={handleDownload}
        />
      )}
    </>
  );
}
