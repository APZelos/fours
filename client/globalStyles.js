import { injectGlobal } from 'styled-components';
import DaysOne from './fonts/DaysOne-Regular.ttf';

injectGlobal`
  @font-face {
    font-family: 'Days One';
    src: url(${DaysOne});
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Days One';
  }
`;
