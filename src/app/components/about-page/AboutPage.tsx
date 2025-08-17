import { Link } from '@/i18n/navigation';
import styles from './AboutPage.module.css';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const i18n = useTranslations('about');
  return (
    <div className={styles.about}>
      <h1>{i18n('title')}</h1>
      <p>{i18n('createdBy')}: Mikhail Rohau</p>
      <p>
        {i18n('course')}:{' '}
        <Link
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://rs.school/courses/reactjs
        </Link>
      </p>
    </div>
  );
}
