import React from 'react';
import PropTypes from 'prop-types';
import StyledTile from './StyledTile';

const Tile = props => (
  <StyledTile value={props.value} position={props.position}>
    {props.value}
  </StyledTile>
);

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Tile;
