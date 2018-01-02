import { combineReducers } from 'redux';
import counter from './counter';
import tiles from './tiles';

// Combines all reduces and
// exports the final reducer.
export default combineReducers({ counter, tiles });
