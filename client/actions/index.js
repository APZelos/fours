import * as ActionTypes from '../actionTypes';

/**
 * Creates and returns a COUNTER_BUTTON_CLICKED action.
 */
export default function counterButtonClicked() {
  const action = {
    type: ActionTypes.COUNTER_BUTTON_CLICKED,
  };

  return action;
}
