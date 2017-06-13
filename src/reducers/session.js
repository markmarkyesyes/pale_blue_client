import * as Actions from '../actions/sessionActions';


const initialState = {
	isFetching: false,
	data: {},
  error: null
};

export function session(state = initialState, action) {
  switch (action.type) {
    case Actions.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };

    default:
      return state;
  }
}