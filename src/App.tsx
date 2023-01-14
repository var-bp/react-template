import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    <img className={styles.img} src={logo} alt="logo" />
    <p>
      Edit <code>src/App.tsx</code> and save to reload.
    </p>
    <a className={styles.link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
      Learn React
    </a>
  </div>
);

export default App;
