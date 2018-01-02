import * as ActionTypes from '../actionTypes';

/**
 * Creates and returns a COUNTER_BUTTON_CLICKED action.
 */
export function counterButtonClicked() {
  const action = {
    type: ActionTypes.COUNTER_BUTTON_CLICKED,
  };

  return action;
}

/**
 * Create and returns a NEW_GAME action.
 */
export function newGame() {
  const action = {
    type: ActionTypes.NEW_GAME,
  };

  return action;
}

export function move(direction) {
  const action = {
    type: ActionTypes.MOVE,
    direction,
  };
  return action;
}
