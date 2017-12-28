import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import StyledButton from './StyledButton';

/**
 * A button component that accepts an on click handler
 * and a text content
 */
export default class Button extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <Wrapper>
        <StyledButton onClick={this.handleClick}>{this.props.children}</StyledButton>
      </Wrapper>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
