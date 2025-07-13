import React from 'react';
import SearchSection from '../search-section/SearchSection.tsx';
import styles from './Content.module.css';
import SearchResult from '../search-result/SearchResult.tsx';

const LS_SEARCH_ROW = 'searchRow';

type AppState = {
  searchText: string;
};

class Content extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const searchText = localStorage.getItem(LS_SEARCH_ROW) || '';
    this.state = {
      searchText,
    };
  }

  handleSearch = (searchText: string): void => {
    searchText = searchText.trim();
    localStorage.setItem(LS_SEARCH_ROW, searchText);
    this.setState({ searchText });
  };

  render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <SearchSection onSearch={this.handleSearch} />
        <SearchResult searchText={this.state.searchText} />
      </div>
    );
  }
}

export default Content;
