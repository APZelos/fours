import * as ActionTypes from '../actionTypes';

/**
 * The counter reducer.
 * Each time is called increases the counter by 1.
 * @param {*} state the current value of the counter.
 * @param {*} action the dispatched action.
 */
const counter = (state = 0, action) => {
  if (action.type !== ActionTypes.COUNTER_BUTTON_CLICKED) {
    return state;
  }

  return state + 1;
};

export default counter;
