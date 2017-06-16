import * as Actions from "../actions/getLikes";

const initialState = {
  startingLikes: [],
  newLikes: [],
  isFetching: false,
  error: null
};

export function likesList(state = initialState, action) {
  switch (action.type) {
    case Actions.LIKE_API_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.LIKE_API_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.GET_LIKES_SUCCESS:
      return {
        ...state,
        startingLikes: action.data,
        isFetching: false
      };
    case Actions.NEW_LIKE:
      return {
        ...state,
        newLikes: [
        	state.newLikes,
        	action.data
        ],
        isFetching: false
      };
    default:
      return state;
  }
}