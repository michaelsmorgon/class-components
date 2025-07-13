import React from 'react';
import SearchSection from '../search-section/SearchSection.tsx';
import styles from './Content.module.css';

const LS_SEARCH_ROW = 'searchRow';

type AppState = {
  searchRow: string;
};

class Content extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const searchRow = localStorage.getItem(LS_SEARCH_ROW) || '';
    this.state = {
      searchRow,
    };
  }

  handleSearch = (searchRow: string): void => {
    searchRow = searchRow.trim();
    localStorage.setItem(LS_SEARCH_ROW, searchRow);
    this.setState({ searchRow });
  };

  render(): React.ReactNode {
    return (
      <div className={styles.main}>
        <SearchSection onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default Content;
