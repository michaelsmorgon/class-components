import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.about}>
      <h1>About</h1>
      <p>Created by: Mikhail Rohau</p>
      <p>
        RS School React course:{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://rs.school/courses/reactjs
        </a>
      </p>
    </div>
  );
}
