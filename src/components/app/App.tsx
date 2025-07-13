import styles from './App.module.css';
import React, { type ReactNode } from 'react';
import SearchSection from '../search-section/SearchSection.tsx';
import SearchResult from '../search-result/SearchResult.tsx';
import ErrorBoundary from '../error-boundary/ErrorBoundary.tsx';
import ErrorButton from '../error-button/ErrorButton.tsx';

type AppState = {
  searchText: string;
};

class App extends React.Component<Record<string, never>, AppState> {
  LS_SEARCH_ROW = 'searchRow';

  constructor(props: Record<string, never>) {
    super(props);
    const searchText = localStorage.getItem(this.LS_SEARCH_ROW) || '';
    this.state = {
      searchText,
    };
  }

  handleSearch = (searchText: string): void => {
    searchText = searchText.trim();
    localStorage.setItem(this.LS_SEARCH_ROW, searchText);
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
              <ErrorButton />
            </ErrorBoundary>
          </div>
        </div>
      </>
    );
  }
}

export default App;
