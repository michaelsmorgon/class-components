import { useEffect } from 'react';
import styles from './SearchResult.module.css';
import type { DataResult } from '../../utils/types';
import DetailItem from '../detail-item/DetailItem';
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
import { useParams, useSearchParams } from 'next/navigation';
import { exportCsv } from '@/app/actions/exportCsv';
import { useTranslations } from 'next-intl';

type Props = {
  searchText: string;
  handleDetail: (data: DataResult | null) => void;
};

export default function SearchResult(props: Props) {
  const { id = '' } = useParams<{ id?: string }>();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { handleDetail } = props;
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectSelectedItems);
  const i18n = useTranslations('result');

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

  const handleDownload = async () => {
    const url = await exportCsv(selectedItems);
    window.location.href = url;
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
          <p>{i18n('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || errorDetail) {
    return (
      <div className={styles.search_result}>
        <p>
          {i18n('errorMessage')}: {getErrorMessage(error || errorDetail)}
        </p>
      </div>
    );
  }

  if (data && data.count === 0) {
    return (
      <div className={styles.search_result}>
        <div className={styles.row}>{i18n('noData')}</div>
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
