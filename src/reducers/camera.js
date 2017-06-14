import * as Actions from '../actions/camera';

const initialState = {
	location: null
};

export function camera(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_CAMERA_LOCATION:
      return {
        location: action.data
      };
    default:
      return state;
  }
}
