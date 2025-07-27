import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../main-layout/MainLayout.tsx';
import MainContent from '../main-content/MainContent.tsx';

export default function App() {
  return (
    <div className={styles.app_wrapper}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainContent />} />
        </Route>
      </Routes>
    </div>
  );
}
