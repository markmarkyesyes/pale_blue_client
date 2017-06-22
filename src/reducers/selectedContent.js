import * as Actions from '../actions/selectedContent';

const initialState = null;

export function selectedContent(state = initialState, action) {
  switch (action.type) {
    case Actions.SELECT_CONTENT:
      return action.data;
    case Actions.CLOSE_CONTENT:
      return null;
    default:
      return state;
  }
}
