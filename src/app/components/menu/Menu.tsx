'use client';

import styles from './Menu.module.css';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Menu() {
  const { theme, setTheme } = useContext(ThemeContext);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}
        >
          About
        </Link>
      </div>
      <button className={styles.themeToggleBtn} onClick={handleClick}>
        {theme === 'dark' ? '🌙' : '🌞'}
      </button>
    </nav>
  );
}
