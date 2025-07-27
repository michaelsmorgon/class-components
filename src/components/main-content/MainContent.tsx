import ErrorBoundary from '../error-boundary/ErrorBoundary';
import SearchResult from '../search-result/SearchResult';
import SearchSection from '../search-section/SearchSection';
import styles from './MainContent.module.css';
import { LS_SEARCH_ROW } from '../../utils/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function MainContent() {
  const [storedValue, setStoredValue] = useLocalStorage(LS_SEARCH_ROW, '');

  const handleSearch = (searchText: string): void => {
    setStoredValue(searchText);
  };

  return (
    <div className={styles.main}>
      <ErrorBoundary>
        <SearchSection onSearch={handleSearch} />
        <SearchResult searchText={storedValue} />
      </ErrorBoundary>
    </div>
  );
}
