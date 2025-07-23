import styles from './App.module.css';
import SearchSection from '../search-section/SearchSection.tsx';
import SearchResult from '../search-result/SearchResult.tsx';
import ErrorBoundary from '../error-boundary/ErrorBoundary.tsx';
import { LS_SEARCH_ROW } from '../../utils/constants.ts';
import { useState } from 'react';

export default function App() {
  const [searchText, setSearchText] = useState(
    localStorage.getItem(LS_SEARCH_ROW) || ''
  );

  const handleSearch = (searchText: string): void => {
    setSearchText(searchText);
  };

  return (
    <>
      <div className={styles.app_wrapper}>
        <div className={styles.main}>
          <ErrorBoundary>
            <SearchSection onSearch={handleSearch} />
            <SearchResult searchText={searchText} />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
