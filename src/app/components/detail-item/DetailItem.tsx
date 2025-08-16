'use client';
import styles from './DetailItem.module.css';
import type { DataResult } from '@/app/utils/types';
import DetailItemInfo from './DetailItemInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  deleteItem,
  selectIsItemSelected,
} from '@/app/redux/slices/ItemSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type Props = {
  item: DataResult;
};

export default function DetailItem(props: Props) {
  const imgPath = props.item.sprites.other.dream_world.front_default;
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const dispatch = useDispatch();
  const isSelect = useSelector(selectIsItemSelected(props.item.name));

  const handlerItemClick = () =>
    router.push(`/details/${props.item.name}?page=${currentPage}`);

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
        <Image
          src={imgPath || ''}
          alt={props.item.name}
          className={styles.item_img}
          width={180}
          height={200}
        />
        <DetailItemInfo item={props.item} />
      </div>
    </div>
  );
}
