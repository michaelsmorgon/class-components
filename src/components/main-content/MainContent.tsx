import ErrorBoundary from '../error-boundary/ErrorBoundary';
import SearchResult from '../search-result/SearchResult';
import SearchSection from '../search-section/SearchSection';
import styles from './MainContent.module.css';
import { LS_SEARCH_ROW } from '../../utils/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCallback, useState } from 'react';
import { type DataResult } from '../search-result/ApiRequest';
import DetailItemInfo from '../detail-item/DetailItemInfo';

export default function MainContent() {
  const [storedValue, setStoredValue] = useLocalStorage(LS_SEARCH_ROW, '');
  const [detailData, setDetailData] = useState<DataResult | null>(null);

  const handleSearch = (searchText: string): void => {
    setStoredValue(searchText);
  };

  const handleDetail = useCallback((data: DataResult | null) => {
    setDetailData(data);
  }, []);
  return (
    <div className={styles.main}>
      <ErrorBoundary>
        <SearchSection onSearch={handleSearch} />
        <div className={styles.main_result}>
          <SearchResult searchText={storedValue} handleDetail={handleDetail} />
          {detailData && (
            <div className={styles.main_detail}>
              <DetailItemInfo
                item={detailData}
                handleDetail={handleDetail}
                showCloseBtn={true}
              />
            </div>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
}
