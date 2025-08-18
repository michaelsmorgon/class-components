'use client';
import styles from './Pagination.module.css';
import { useRouter } from 'next/navigation';

type Props = {
  page: string;
};

export default function Pagination({ page }: Props) {
  const currentPage = parseInt(page);
  const router = useRouter();

  const changePage = (newPage: number) => {
    router.push(`/?page=${newPage.toString()}`);
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
