// https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
