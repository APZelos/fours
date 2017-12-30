import { css } from 'styled-components';
import colors from './colors';

export const fontFamily = css`
  font-family: 'Days One';
`;

export const fontSizes = {
  small: css`
    font-size: 24px;
  `,
  medium: css`
    font-size: 36px;
  `,
  big: css`
    font-size: 64px;
  `,
};

export const fontColors = {
  main: css`
    color: ${colors.font};
  `,
  alt: css`
    color: ${colors.fontAlt};
  `,
};
