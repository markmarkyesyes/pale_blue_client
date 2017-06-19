import * as Actions from "../actions/submitLike";

const initialState = [];

export function myLiked(state = initialState, action) {
  switch (action.type) {
    case Actions.SUBMIT_LIKE_SUCCESS:
      return [
      	...state,
      	action.data
      ];
    default:
      return state;
  }
}