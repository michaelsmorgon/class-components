import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../about-page/AboutPage.tsx';
import MainLayout from '../main-layout/MainLayout.tsx';
import MainContent from '../main-content/MainContent.tsx';
import NotFound from '../not-found/NotFound.tsx';

export default function App() {
  return (
    <div className={styles.app_wrapper}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainContent />} />
          <Route path="details/:id" element={<MainContent />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
