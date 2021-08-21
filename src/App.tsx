import React from 'react';
import logo from './logo.svg';
import { Container, Img, Link } from './App.style';

const App = (): JSX.Element => (
  <Container>
    <Img src={logo} alt="logo" />
    <p>
      Edit <code>src/App.tsx</code> and save to reload.
    </p>
    <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
      Learn React
    </Link>
  </Container>
);

export default App;
