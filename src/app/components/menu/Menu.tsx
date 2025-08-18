'use client';

import styles from './Menu.module.css';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

export default function Menu() {
  const { theme, setTheme } = useContext(ThemeContext);
  const pathname = usePathname();
  const router = useRouter();
  const i18n = useTranslations('menu');
  const locale = useLocale();
  const searchParams = useSearchParams();
  // const currentPage = parseInt(searchParams.get('page') || '');
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const page = searchParams.get('page');
      setCurrentPage(page ? parseInt(page) : undefined);
    }
  }, [searchParams]);

  let query = '';
  if (currentPage) {
    query = `?page=${currentPage}`;
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const handleThemeClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.replace(`${pathname}${query}`, { locale: newLocale });
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        >
          {i18n('home')}
        </Link>
        <Link
          href="/about"
          className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}
        >
          {i18n('about')}
        </Link>
      </div>
      <div className={styles.controls}>
        <select
          className={styles.langSwitcher}
          onChange={handleLocaleChange}
          defaultValue={locale}
        >
          {routing.locales.map((loc) => (
            <option key={loc} value={loc}>
              {loc.toUpperCase()}
            </option>
          ))}
        </select>
        <button className={styles.themeToggleBtn} onClick={handleThemeClick}>
          {theme === 'dark' ? '🌙' : '🌞'}
        </button>
      </div>
    </nav>
  );
}
