import * as Actions from "../actions/submitActions.js";

let initialState = { message: null, error: false, isFetching: false };

export function submit(state = initialState, action) {
  switch (Actions.type) {
    case Actions.SUBMIT_START:
      return { ...state, isFetching: true };
    case Actions.SUBMIT_SUCCESS:
      return { error: false, message: action.message, isFetching: false };
    case Actions.SUBMIT_FAILURE:
      return { error: true, message: action.message, isFetching: false };
    default:
      return state;
  }
}
