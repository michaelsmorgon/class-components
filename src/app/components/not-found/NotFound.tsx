import Image from 'next/image';
import styles from './NotFound.module.css';
import notFoundIcon from '@/assets/not-found.svg';

export default function NotFoundPage() {
  return (
    <div className={styles.not_found}>
      <div className={styles.wrapper}>
        <Image src={notFoundIcon} alt="Not found" width={200} height={200} />
        <p className={styles.message}>Sorry, smth went wrong((</p>
      </div>
    </div>
  );
}
