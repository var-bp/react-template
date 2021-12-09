import { styled } from '@linaria/react';

const Img = styled.img`
  &.has-responsive-layout {
    display: block;
    max-width: 100%;
    height: auto;
  }

  &.has-no-dimensions {
    content-visibility: auto;
  }
`;

export default Img;
