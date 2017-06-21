import * as GetActions from "../actions/getDots";
import * as SubmitActions from "../actions/submitDot";

const initialState = {
  data: [],
  isFetching: false,
  error: null
};

export function dotsList(state = initialState, action) {
  switch (action.type) {
    case GetActions.DOT_API_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case GetActions.DOT_API_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case GetActions.GET_DOTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case SubmitActions.SUBMIT_DOT_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.data],
        isFetching: false
      };
    case GetActions.CLEAN_DEMO_DOTS:
      return {
        ...state,
        data: state.data.filter((dot) => {
          return !dot.demoId;
        })
      };
    default:
      return state;
  }
}
