'use client';
import React, { useState } from 'react';
import styles from './SearchSection.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetItemsQuery } from '../../services/api';
import { useTranslations } from 'next-intl';

const LS_SEARCH_ROW = 'searchRow';

type Props = {
  onSearch: (searchRow: string) => void;
};

export default function SearchSection(props: Props) {
  const [storedValue, setStoredValue] = useLocalStorage(LS_SEARCH_ROW, '');
  const [searchRow, setSearchRow] = useState(storedValue || '');
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const i18n = useTranslations('search');

  const { refetch } = useGetItemsQuery({
    page: parseInt(page),
    searchText: searchRow,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchRow(e.target.value);
  };

  const handleSearchClick = (): void => {
    const searchText = searchRow.trim();
    setStoredValue(searchText);
    props.onSearch(searchText);
    if (searchText) {
      router.push(`/?search=${searchText}`);
    } else {
      router.push(`/`);
    }
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <div className={styles.search_section}>
      <input
        className={styles.input}
        type="text"
        placeholder={i18n('placeholder')}
        value={searchRow}
        onChange={handleInputChange}
      />
      <button className={styles.search_btn} onClick={handleSearchClick}>
        {i18n('search')}
      </button>
      <button className={styles.refresh_btn} onClick={handleRefetch}>
        🔄 {i18n('refresh')}
      </button>
    </div>
  );
}
