import styles from './DetailItem.module.css';
import type { DataResult } from '../../utils/types';
import DetailItemInfo from './DetailItemInfo';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  deleteItem,
  selectIsItemSelected,
} from '../../redux/slices/ItemSlice';

type Props = {
  item: DataResult;
};

export default function DetailItem(props: Props) {
  const imgPath = props.item.sprites.other.dream_world.front_default;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const dispatch = useDispatch();
  const isSelect = useSelector(selectIsItemSelected(props.item.name));

  const handlerItemClick = () =>
    navigate(`/details/${props.item.name}?page=${currentPage}`);

  const handleSelectItem = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (isSelect) {
      dispatch(deleteItem(props.item.name));
    } else {
      dispatch(addItem(props.item));
    }
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.checkbox_container} onClick={handleSelectItem}>
        <input
          type="checkbox"
          className={styles.checkbox_input}
          checked={isSelect}
          onChange={() => {}}
        />
        <span className={styles.custom_checkbox}></span>
      </label>
      <div className={styles.item_info} onClick={handlerItemClick}>
        <img
          src={imgPath || ''}
          alt={props.item.name}
          className={styles.item_img}
        />
        <DetailItemInfo item={props.item} />
      </div>
    </div>
  );
}
