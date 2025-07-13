import React, { type ReactNode } from 'react';
import styles from './SearchSection.module.css';

const LS_SEARCH_ROW = 'searchRow';

type Props = {
  onSearch: (searchRow: string) => void;
};

type State = {
  searchRow: string;
};

class SearchSection extends React.Component<Props, State> {
  PLACEHOLDER: string = 'Type text here...';
  constructor(props: Props) {
    super(props);

    const storedSearch = localStorage.getItem(LS_SEARCH_ROW) || '';
    this.state = { searchRow: storedSearch };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchRow = e.target.value;
    this.setState({ searchRow });
  };

  handleSearchClick = (): void => {
    this.props.onSearch(this.state.searchRow);
  };

  render(): ReactNode {
    return (
      <div className={styles.search_section}>
        <input
          className={styles.input}
          type="text"
          placeholder={this.PLACEHOLDER}
          value={this.state.searchRow}
          onChange={this.handleInputChange}
        />
        <button className={styles.search_btn} onClick={this.handleSearchClick}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchSection;
