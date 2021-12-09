import * as React from 'react';
import classNames from 'classnames';
import Img, { ImgProps } from '../img';
import { Container } from './background-img.style';

// type PickedImgProps = Pick<ImgProps, 'src' | 'alt' | 'loading'>;
type OmittedImgProps = Omit<ImgProps, 'hasResponsiveLayout' | 'width' | 'height'>;

interface Props extends OmittedImgProps {
  paddingTrickHeight?: number;
  paddingTrickWidth?: number;
  height?: string;
  children?: JSX.Element | JSX.Element[];
}

// https://css-tricks.com/using-performant-next-gen-images-in-css-with-image-set/#using-picture-for-backgrounds-instead
const BackgroundImg = ({
  primaryMobileSrc,
  primaryMobileWidth,
  primaryDesktopSrc,
  primaryDesktopWidth,
  fallbackMobileSrc,
  fallbackMobileWidth,
  fallbackDesktopSrc,
  fallbackDesktopWidth,
  height,
  alt,
  loading,
  paddingTrickHeight,
  paddingTrickWidth,
  children,
}: Props) => (
  <Container
    height={height}
    className={classNames({
      'has-fixed-height': height,
      'aspect-ratio-padding-trick': paddingTrickHeight && paddingTrickWidth,
    })}
  >
    <Img
      primaryMobileSrc={primaryMobileSrc}
      primaryMobileWidth={primaryMobileWidth}
      primaryDesktopSrc={primaryDesktopSrc}
      primaryDesktopWidth={primaryDesktopWidth}
      fallbackMobileSrc={fallbackMobileSrc}
      fallbackMobileWidth={fallbackMobileWidth}
      fallbackDesktopSrc={fallbackDesktopSrc}
      fallbackDesktopWidth={fallbackDesktopWidth}
      hasResponsiveLayout={false}
      loading={loading}
      alt={alt}
    />
    <div>{children}</div>
  </Container>
);

BackgroundImg.defaultProps = {
  children: undefined,
  height: undefined,
  paddingTrickHeight: undefined,
  paddingTrickWidth: undefined,
};

export default BackgroundImg;
