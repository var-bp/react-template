import { styled } from '@linaria/react';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  position: relative;
  width: 100%;

  &.has-fixed-height {
    height: ${({ height }) => height};
  }

  &.aspect-ratio-padding-trick {
    height: 0;
    padding-top: ${({ paddingTrickHeight, paddingTrickWidth }) =>
      `calc(${paddingTrickHeight} / ${paddingTrickWidth} * 100%)`};
  }

  > div {
    position: relative;
  }

  > img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
