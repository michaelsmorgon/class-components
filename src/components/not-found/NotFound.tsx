import styles from './NotFound.module.css';
import notFoundImage from '../../assets/not-found.svg';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.wrapper}>
        <img src={notFoundImage} alt="Page not found" />
        <p className={styles.message}>Sorry, smth went wrong((</p>
      </div>
    </div>
  );
}
