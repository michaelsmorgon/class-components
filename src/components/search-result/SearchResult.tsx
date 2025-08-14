import { useEffect } from 'react';
import styles from './SearchResult.module.css';
import type { DataResult } from '../../utils/types';
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
import { useGetItemDetailQuery, useGetItemsQuery } from '../../services/api';
import { getErrorMessage } from '../../utils/apiErrorHandler';

type Props = {
  searchText: string;
  handleDetail: (data: DataResult | null) => void;
};

export default function SearchResult(props: Props) {
  const { id = '' } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { handleDetail } = props;
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectSelectedItems);

  const { data, error, isLoading, isFetching } = useGetItemsQuery({
    page: parseInt(page),
    searchText: props.searchText,
  });

  const {
    data: detailData,
    error: errorDetail,
    isLoading: isLoadingDetail,
    isFetching: isFetchingDetail,
  } = useGetItemDetailQuery(id, {
    skip: !id,
  });

  const isAnyLoading =
    isLoading || isFetching || isLoadingDetail || isFetchingDetail;

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
    if (id && detailData) {
      handleDetail(detailData);
    } else {
      handleDetail(null);
    }
  }, [id, detailData, handleDetail]);

  if (isAnyLoading) {
    return (
      <div className={styles.search_result}>
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || errorDetail) {
    return (
      <div className={styles.search_result}>
        <p>Error Message: {getErrorMessage(error || errorDetail)}</p>
      </div>
    );
  }

  if (data && data.count === 0) {
    return (
      <div className={styles.search_result}>
        <div className={styles.row}>No data...</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.search_result}>
        {data &&
          data.data.map((item, index) => {
            return <DetailItem item={item} key={index} />;
          })}
        {data && data.count >= COUNT_PER_PAGE && <Pagination page={page} />}
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
