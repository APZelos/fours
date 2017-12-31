import React from 'react';
import PropTypes from 'prop-types';
import StyledGird from './StyledGird';
import StyledGridItem from './StyledGridItem';

export default class Gird extends React.Component {
  constructor(props) {
    super(props);

    this.createGridItems = this.createGridItems.bind(this);
  }

  /**
   * Creates the grid items based on
   * the gird size passed.
   */
  createGridItems() {
    const items = [];

    for (let i = 0; i < this.props.size; i++) {
      items.push(<StyledGridItem key={i} />);
    }

    return items;
  }

  render() {
    return <StyledGird>{this.createGridItems()}</StyledGird>;
  }
}

Gird.propTypes = {
  size: PropTypes.number.isRequired,
};
