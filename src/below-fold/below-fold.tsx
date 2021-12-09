import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { Container } from './below-fold.style';

interface Props {
  children: JSX.Element;
  rootMargin?: string;
}

const BelowFold = ({ children, rootMargin }: Props) => {
  const { ref, inView } = useInView({
    // https://github.com/thebuilder/react-intersection-observer#options
    threshold: 0,
    triggerOnce: true,
    rootMargin,
  });

  return <Container ref={ref}>{!!inView && children}</Container>;
};

BelowFold.defaultProps = {
  rootMargin: '200px 0px 0px 0px',
};

export default BelowFold;
