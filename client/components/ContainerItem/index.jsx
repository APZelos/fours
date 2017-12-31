import styled from 'styled-components';

const ContainerItem = styled.div`
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
`;

export default ContainerItem;
