import * as Actions from '../actions/userLocation';

const initialState = {
  isFetching: false,
	data: null,
  error: null
};

export function userLocation(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USER_LOCATION_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_USER_LOCATION_SUCCESS:
      return {
        isFetching: false,
        data: action.data,
        error: null
      };
    case Actions.GET_USER_LOCATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
