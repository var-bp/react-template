import React from 'react';
import logo from './logo.svg';
import { Container, Header, Image, Link } from './App.style';

const App = (): JSX.Element => {
  return (
    <Container>
      <Header>
        <Image src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </Link>
      </Header>
    </Container>
  );
};

export default App;
