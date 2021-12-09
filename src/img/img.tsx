import * as React from 'react';
import classNames from 'classnames';
import Img from './img.style';

export interface ImgProps {
  primaryMobileSrc?: string;
  primaryMobileWidth?: number;
  primaryDesktopSrc: string;
  primaryDesktopWidth?: number;
  fallbackMobileSrc?: string;
  fallbackMobileWidth?: number;
  fallbackDesktopSrc?: string;
  fallbackDesktopWidth?: number;
  hasResponsiveLayout?: boolean;
  loading?: 'eager' | 'lazy';
  width?: number;
  height?: number;
  alt?: string;
}

// https://www.industrialempathy.com/posts/image-optimizations/

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Image = ({
  primaryMobileSrc,
  primaryMobileWidth,
  primaryDesktopSrc,
  primaryDesktopWidth,
  fallbackMobileSrc,
  fallbackMobileWidth,
  fallbackDesktopSrc,
  fallbackDesktopWidth,
  alt,
  width,
  height,
  loading,
  hasResponsiveLayout,
}: ImgProps) => {
  if (
    primaryMobileSrc &&
    primaryMobileWidth &&
    primaryDesktopSrc &&
    primaryDesktopWidth &&
    !fallbackMobileSrc &&
    !fallbackMobileWidth &&
    !fallbackDesktopSrc &&
    !fallbackDesktopWidth
  ) {
    return (
      <Img
        srcSet={`${primaryMobileSrc} ${primaryMobileWidth}w, ${primaryDesktopSrc} ${primaryDesktopWidth}w`}
        src={primaryDesktopSrc}
        width={width}
        height={height}
        alt={alt}
        // Set it to 'lazy' if image isn’t in the view port
        loading={loading}
        decoding="async"
        className={classNames({
          'has-responsive-layout': hasResponsiveLayout,
          'has-no-dimensions': !width || !height,
        })}
      />
    );
  }
  if (
    primaryMobileSrc &&
    primaryMobileWidth &&
    primaryDesktopSrc &&
    primaryDesktopWidth &&
    fallbackMobileSrc &&
    fallbackMobileWidth &&
    fallbackDesktopSrc &&
    fallbackDesktopWidth
  ) {
    return (
      <picture>
        <source
          type="image/webp"
          srcSet={`${primaryMobileSrc} ${primaryMobileWidth}w, ${primaryDesktopSrc} ${primaryDesktopWidth}w`}
        />
        <Img
          srcSet={`${fallbackMobileSrc} ${fallbackMobileWidth}w, ${fallbackDesktopSrc} ${fallbackDesktopWidth}w`}
          src={fallbackDesktopSrc}
          width={width}
          height={height}
          alt={alt}
          // Set it to 'lazy' if image isn’t in the view port
          loading={loading}
          decoding="async"
          className={classNames({
            'has-responsive-layout': hasResponsiveLayout,
            'has-no-dimensions': !width || !height,
          })}
        />
      </picture>
    );
  }
  return (
    <Img
      src={primaryDesktopSrc}
      width={width}
      height={height}
      alt={alt}
      // Set it to 'lazy' if image isn’t in the view port
      loading={loading}
      decoding="async"
      className={classNames({
        'has-responsive-layout': hasResponsiveLayout,
        'has-no-dimensions': !width || !height,
      })}
    />
  );
};

Image.defaultProps = {
  primaryMobileSrc: undefined,
  primaryMobileWidth: undefined,
  primaryDesktopWidth: undefined,
  fallbackMobileSrc: undefined,
  fallbackMobileWidth: undefined,
  fallbackDesktopSrc: undefined,
  fallbackDesktopWidth: undefined,
  hasResponsiveLayout: undefined,
  loading: undefined,
  width: undefined,
  height: undefined,
  alt: undefined,
};

export default Image;
