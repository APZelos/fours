import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import CounterButton from './CounterButton';
import Span from '../components/Span';

const mapStateToProps = state => ({
  counter: state.counter,
});

const App = ({ counter }) => (
  <div>
    <Span>You clicked: {counter} times</Span>
    <CounterButton>Click me!</CounterButton>
  </div>
);

App.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(App);
