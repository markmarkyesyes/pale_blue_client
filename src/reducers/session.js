import * as Actions from "../actions/sessionActions";

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
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: { _id: action.data }
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.REG_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.REG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: { _id: action.data }
      };
    case Actions.REG_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
