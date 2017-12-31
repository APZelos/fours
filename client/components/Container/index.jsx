import styled from 'styled-components';
import colors from '../../styles/colors';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(10px, auto);
  grid-row-gap: 10px;
  background-color: ${colors.mainLighter};
  border-radius: 10px;
  padding: 15px;
  max-width: 475px;
`;

export default Container;
