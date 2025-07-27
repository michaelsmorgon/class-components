import styles from './DetailItem.module.css';
import { type DataResult } from '../search-result/ApiRequest';
import DetailItemInfo from './DetailItemInfo';
import { useNavigate } from 'react-router-dom';

type Props = {
  item: DataResult;
};

export default function DetailItem(props: Props) {
  const imgPath = props.item.sprites.other.dream_world.front_default;
  const navigate = useNavigate();

  const handlerItemClick = () => navigate(`/details/${props.item.name}`);

  return (
    <div className={styles.wrapper} onClick={handlerItemClick}>
      <div className={styles.item}>
        <div className={styles.item_info}>
          <img
            src={imgPath || ''}
            alt={props.item.name}
            className={styles.item_img}
          />
          <DetailItemInfo item={props.item} />
        </div>
      </div>
    </div>
  );
}
