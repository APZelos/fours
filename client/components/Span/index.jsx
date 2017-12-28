import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import StyledSpan from './StyledSpan';

/**
 * A span component used for
 * displaying text.
 */
const Span = ({ children }) => (
  <Wrapper>
    <StyledSpan>{children}</StyledSpan>
  </Wrapper>
);

Span.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Span;
