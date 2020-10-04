// https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './global-style';

ReactDOM.render(
  <StrictMode>
    <>
      <GlobalStyle />
      <App />
    </>
  </StrictMode>,
  document.querySelector('#root'),
);
