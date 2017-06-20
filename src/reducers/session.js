import * as Actions from "../actions/sessionActions";

const initialState = {
  data: {
    _id: null
  },
  error: null
};

export function session(state = initialState, action) {
  switch (action.type) {
    case Actions.LOGIN_START:
      return {
        ...state,
        error: null
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        data: { _id: action.data }
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case Actions.REG_START:
      return {
        ...state,
        error: null
      };
    case Actions.REG_SUCCESS:
      return {
        ...state,
        error: null,
        data: { _id: action.data }
      };
    case Actions.REG_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case Actions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
