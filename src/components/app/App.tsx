import styles from './App.module.css';
import React, { type ReactNode } from 'react';
import SearchSection from '../search-section/SearchSection.tsx';
import SearchResult from '../search-result/SearchResult.tsx';
import ErrorBoundary from '../error-boundary/ErrorBoundary.tsx';
import { LS_SEARCH_ROW } from '../../utils/constants.ts';

type AppState = {
  searchText: string;
};

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const searchText = localStorage.getItem(LS_SEARCH_ROW) || '';
    this.state = {
      searchText,
    };
  }

  handleSearch = (searchText: string): void => {
    this.setState({ searchText });
  };

  render(): ReactNode {
    return (
      <>
        <div className={styles.app_wrapper}>
          <div className={styles.main}>
            <ErrorBoundary>
              <SearchSection onSearch={this.handleSearch} />
              <SearchResult searchText={this.state.searchText} />
            </ErrorBoundary>
          </div>
        </div>
      </>
    );
  }
}

export default App;
