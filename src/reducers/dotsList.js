import * as Actions from "../actions/getDotsActions";

const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export function dotsList(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DOTS_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_DOTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case Actions.GET_DOTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    //pseudocode
    case Actions.UPDATE_LIST:
      return {
        ...state,
        dotsList: [...dotsList, action.data]
      };

    default:
      return state;
  }
}
