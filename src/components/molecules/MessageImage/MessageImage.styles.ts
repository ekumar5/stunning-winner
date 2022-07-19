import { Dimensions } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
// @ts-ignore
import Lightbox from 'react-native-lightbox';
import { css } from 'styled-components';
import { styled } from '../../../utils/styled';

const { height: screenHeight } = Dimensions.get('window');

const activeLightboxStyles = `
    height: ${screenHeight}
`;

const inActiveLightboxStyles = `
    width: 240px;
    height: 180px;
    border-radius: 16px;
    margin: 4px;
`;

export const StyledLightbox = styled(Lightbox)`
  width: 248px;
  height: 188px;
`;

interface IImageProps extends FastImageProps {
  lightboxOpen?: boolean;
}

export const Image = styled(FastImage)<IImageProps>`
  ${(props) =>
    props.lightboxOpen
      ? css`
          ${activeLightboxStyles}
        `
      : css`
          ${inActiveLightboxStyles}
        `}
`;
