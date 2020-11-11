// https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './global-style';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <>
      <GlobalStyle />
      <App />
    </>
  </StrictMode>,
  document.querySelector('#root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
