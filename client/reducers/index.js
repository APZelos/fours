import { combineReducers } from 'redux';
import counter from './counter';

// Combines all reduces and
// exports the final reducer.
export default combineReducers({ counter });
