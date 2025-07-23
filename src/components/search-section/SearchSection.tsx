import React, { useState } from 'react';
import styles from './SearchSection.module.css';

const LS_SEARCH_ROW = 'searchRow';

type Props = {
  onSearch: (searchRow: string) => void;
};

export default function SearchSection(props: Props) {
  const PLACEHOLDER: string = 'Type text here...';
  const [searchRow, setSearchRow] = useState(
    localStorage.getItem(LS_SEARCH_ROW) || ''
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchRow(e.target.value);
  };

  const handleSearchClick = (): void => {
    const searchText = searchRow.trim();
    localStorage.setItem(LS_SEARCH_ROW, searchText);
    props.onSearch(searchText);
  };

  return (
    <div className={styles.search_section}>
      <input
        className={styles.input}
        type="text"
        placeholder={PLACEHOLDER}
        value={searchRow}
        onChange={handleInputChange}
      />
      <button className={styles.search_btn} onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}
