import styles from './DetailItem.module.css';
import { type DataResult } from '../search-result/ApiRequest';

type Props = {
  item: DataResult;
};

export default function DetailItem(props: Props) {
  const imgPath = props.item.sprites.other.dream_world.front_default;
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <div className={styles.item_info}>
          <img
            src={imgPath || ''}
            alt={props.item.name}
            className={styles.item_img}
          />
          <div className={styles.info}>
            <div className={styles.header}>
              <h2 className={styles.title}>{props.item.name}</h2>
            </div>
            <span className={styles.title_desc}>Description:</span>
            <div className={styles.stat_wrapper}>
              <div>Height: {props.item.height}</div>
              <div>Weight: {props.item.weight}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
