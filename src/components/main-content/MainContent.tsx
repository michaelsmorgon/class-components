import { useState } from 'react';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import SearchResult from '../search-result/SearchResult';
import SearchSection from '../search-section/SearchSection';
import styles from './MainContent.module.css';
import { LS_SEARCH_ROW } from '../../utils/constants';

export default function MainContent() {
  const [searchText, setSearchText] = useState(
    localStorage.getItem(LS_SEARCH_ROW) || ''
  );

  const handleSearch = (searchText: string): void => {
    setSearchText(searchText);
  };

  return (
    <div className={styles.main}>
      <ErrorBoundary>
        <SearchSection onSearch={handleSearch} />
        <SearchResult searchText={searchText} />
      </ErrorBoundary>
    </div>
  );
}
