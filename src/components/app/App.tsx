import styles from './App.module.css';
import React, { type ReactNode } from 'react';
import Content from '../content/Content.tsx';

class App extends React.Component {
  render(): ReactNode {
    return (
      <>
        <div className={styles.app_wrapper}>
          <Content />
        </div>
      </>
    );
  }
}

export default App;
