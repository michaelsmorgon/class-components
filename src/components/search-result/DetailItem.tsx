import styles from './SearchResult.module.css';
import { type DataResult } from './ApiRequest';

type Props = {
  item: DataResult;
};

export default function DetailItem(props: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.cell}>{props.item.name}</div>
      <div className={styles.cell}>
        Height: {props.item.height}; Weight: {props.item.weight}
      </div>
    </div>
  );
}
