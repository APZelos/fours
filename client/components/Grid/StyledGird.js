import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledGrid = styled.div`
  background-color: ${colors.mainLighter};
  display: inline-grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 150px 150px 150px 150px;
  grid-column-gap: 15px;
  grid-row-gap: 10px;
`;

export default StyledGrid;
