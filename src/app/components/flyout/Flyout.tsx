import styles from './Flyout.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  selectCount: number;
  onUnselectAll: () => void;
  onDownload: () => void;
};

export default function Flyout({
  selectCount,
  onUnselectAll,
  onDownload,
}: Props) {
  const i18n = useTranslations('flyout');
  const selectedText = `${selectCount} ${selectCount === 1 ? i18n('itemsIs') : i18n('itemsAre')} ${i18n('selected')}`;
  return (
    <div className={styles.flyout}>
      <div className={styles.flyoutInner}>
        <div className={styles.selectedText}>{selectedText}</div>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonUnselect}`}
            onClick={onUnselectAll}
          >
            {i18n('unselectAll')}
          </button>
          <button
            className={`${styles.button} ${styles.buttonDownload}`}
            onClick={onDownload}
          >
            {i18n('download')}
          </button>
        </div>
      </div>
    </div>
  );
}
