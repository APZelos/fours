import { injectGlobal } from 'styled-components';
import DaysOne from './fonts/DaysOne-Regular.ttf';
import * as types from './styles/types';

injectGlobal`
  @font-face {
    font-family: 'Days One';
    src: url(${DaysOne});
  }

  * {
    box-sizing: border-box;
  }

  body {
    ${types.fontFamily};
    ${types.fontSizes.medium};
    ${types.fontColors.main};
  }
`;
