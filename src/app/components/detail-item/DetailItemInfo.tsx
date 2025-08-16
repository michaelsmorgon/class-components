'use client';
import type { DataResult } from '@/app/utils/types';
import styles from './DetailItem.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  item: DataResult;
  showCloseBtn?: boolean;
  handleDetail?: (data: DataResult | null) => void;
};

export default function DetailItemInfo(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const handleClose = () => {
    if (props.handleDetail) {
      props.handleDetail(null);
    }
    router.replace(`/?page=${page}`);
  };

  return (
    <div className={styles.info}>
      <div className={styles.header}>
        <h2 className={styles.title}>{props.item.name}</h2>
      </div>
      <span className={styles.title_desc}>Description:</span>
      <div className={styles.stat_wrapper}>
        <div>Height: {props.item.height}</div>
        <div>Weight: {props.item.weight}</div>
      </div>
      {props.showCloseBtn && (
        <div className={styles.btn_wrapper}>
          <button className={styles.close_btn} onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
