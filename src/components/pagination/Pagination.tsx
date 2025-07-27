import { useSearchParams } from 'react-router-dom';
import styles from './Pagination.module.css';

type Props = {
  page: string;
};

export default function Pagination({ page }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(page);

  const changePage = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginator_btn}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <div className={styles.page_num}>{currentPage}</div>
      <button
        className={styles.paginator_btn}
        onClick={() => changePage(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
