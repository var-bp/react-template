import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import robotoRegularWoff2 from './roboto-regular.woff2';

export default createGlobalStyle`
  @font-face {
    font-family: 'Roboto Regular';
    src: url(${robotoRegularWoff2}) format('woff2');
  }

  ${normalize()}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Roboto Regular', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
