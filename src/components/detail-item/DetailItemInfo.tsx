import { useLocation, useNavigate } from 'react-router-dom';
import type { DataResult } from '../search-result/ApiRequest';
import styles from './DetailItem.module.css';

type Props = {
  item: DataResult;
  showCloseBtn?: boolean;
  handleDetail?: (data: DataResult | null) => void;
};

export default function DetailItemInfo(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    if (props.handleDetail) {
      props.handleDetail(null);
    }
    navigate('/' + location.search);
  };

  return (
    <div className={styles.info}>
      {!props.showCloseBtn && (
        <label
          className={styles.checkbox_container}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input type="checkbox" className={styles.checkbox_input} />
          <span className={styles.custom_checkbox}></span>
        </label>
      )}
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
