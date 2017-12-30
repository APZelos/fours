import styled, { keyframes } from 'styled-components';

const cubicBezier = 'cubic-bezier(0.215, 0.610, 0.355, 1.000)';

const bounceIn = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: ${cubicBezier};
  }
  0% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(.9, .9, .9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(.97, .97, .97);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const tileTypes = {
  base: {
    backgroundColor: '#009688',
    shadowColor: '#00796b',
    color: 'white',
    fontSize: '64px',
  },
  regular: {
    backgroundColor: '#fffaf7',
    shadowColor: '#fbc02d',
    color: '#333333',
    fontSize: '64px',
  },
  copper: {
    backgroundColor: '#fffaf7',
    shadowColor: '#fbc02d',
    color: '#e64a19',
    fontSize: '36px',
  },
  brass: {
    backgroundColor: '#fffaf7',
    shadowColor: '#fbc02d',
    color: '#ffa000',
    fontSize: '36px',
  },
  gold: {
    backgroundColor: '#fffaf7',
    shadowColor: '#fbc02d',
    color: '#fbc02d',
    fontSize: '36px',
  },
  pureGold: {
    backgroundColor: '#fbc02d',
    shadowColor: '#f57f17',
    color: 'white',
    fontSize: '24px',
  },
};

function getTileType(value) {
  // Base (2)
  if (value === 2) return tileTypes.base;
  // Regular (4 - 64)
  if (value < 128) return tileTypes.regular;
  // Brass (128)
  if (value === 128) return tileTypes.copper;
  // Brass (236)
  if (value === 236) return tileTypes.brass;
  // Gold (472 - 944)
  if (value <= 944) return tileTypes.gold;
  // Pure gold (> 944)
  return tileTypes.pureGold;
}

const StyledTile = styled.div`
  animation: ${bounceIn} 0.5s;
  transition: left 0.5s ${cubicBezier}, top 0.5s ${cubicBezier};
  position: absolute;
  left: ${props => props.position.x}px;
  top: ${props => props.position.y}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100px;
  height: 140px;
  background-color: ${props => getTileType(props.value).backgroundColor};
  box-shadow: 0 10px 0 ${props => getTileType(props.value).shadowColor};
  color: ${props => getTileType(props.value).color};
  font-family: 'Days One';
  font-weight: 400;
  font-size: ${props => getTileType(props.value).fontSize};
`;

export default StyledTile;
