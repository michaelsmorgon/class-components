import styles from './Flyout.module.css';

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
  return (
    <div className={styles.flyout}>
      <div className={styles.flyoutInner}>
        <div className={styles.selectedText}>
          {selectCount} {selectCount === 1 ? 'item is' : 'items are'} selected
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonUnselect}`}
            onClick={onUnselectAll}
          >
            Unselect All
          </button>
          <button
            className={`${styles.button} ${styles.buttonDownload}`}
            onClick={onDownload}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
