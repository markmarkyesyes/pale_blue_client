import * as Actions from '../actions/getDotsActions';


const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export function pointsList(state = initialState, action) {
  switch (action.type) {
    case Actions.REQUEST_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case Actions.REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
}