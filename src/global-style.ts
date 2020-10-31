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

  /* html {
    font-family: sans-serif;
    font-size: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  } */

  /* html,
  body {
    height: 100%;
  } */

  body {
    margin: 0;
    font-family: 'Roboto Regular', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* img {
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: bicubic;
  } */

  /* Holy Grail Layout */

  /* #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  #app > main {
    display: flex;
    flex: 1;
  } */
`;
