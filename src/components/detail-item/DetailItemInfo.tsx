import { useNavigate } from 'react-router-dom';
import type { DataResult } from '../search-result/ApiRequest';
import styles from './DetailItem.module.css';

type Props = {
  item: DataResult;
  showCloseBtn?: boolean;
};

export default function DetailItemInfo(props: Props) {
  const navigate = useNavigate();
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
          <button className={styles.close_btn} onClick={() => navigate('..')}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
