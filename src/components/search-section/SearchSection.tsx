import React, { useState } from 'react';
import styles from './SearchSection.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const LS_SEARCH_ROW = 'searchRow';

type Props = {
  onSearch: (searchRow: string) => void;
};

export default function SearchSection(props: Props) {
  const PLACEHOLDER: string = 'Type text here...';
  const [storedValue, setStoredValue] = useLocalStorage(LS_SEARCH_ROW, '');
  const [searchRow, setSearchRow] = useState(storedValue || '');
  const navigation = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchRow(e.target.value);
  };

  const handleSearchClick = (): void => {
    const searchText = searchRow.trim();
    setStoredValue(searchText);
    props.onSearch(searchText);
    if (searchText) {
      navigation(`/?search=${searchText}`);
    } else {
      navigation('/');
    }
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
