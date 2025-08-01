import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function Menu() {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <NavLink to="." end className={styles.link}>
          Home
        </NavLink>
        <NavLink to="about" className={styles.link}>
          About
        </NavLink>
      </div>
      <button className={styles.themeToggleBtn} onClick={handleClick}>
        {theme === 'dark' ? '🌙' : '🌞'}
      </button>
    </nav>
  );
}
