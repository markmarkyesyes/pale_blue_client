export const REQUEST_START = "REQUEST_START";
export const REQUEST_SUCCESS = "REQUEST_SUCCESS";
export const REQUEST_FAILURE = "REQUEST_FAILURE";
export const UPDATE_LIST = "UPDATE_LIST";

export function requestStart() {
  return {
    type: REQUEST_START
  };
}

export function requestSuccess(data) {
  return {
    type: REQUEST_SUCCESS,
    data
  };
}

export function requestFailure(error) {
  return {
    type: REQUEST_FAILURE,
    error
  };
}

export function updateDotsList(data) {
  return {
    type: UPDATE_LIST,
    data
  };
}

export function getDotLocations() {
  return dispatch => {
    dispatch(requestStart());

    fetch("api/dots")
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(dotsList => {
        dispatch(requestSuccess(dotsList));
      })
      .catch(error => {
        console.log(error);
        dispatch(requestFailure(error));
      });
  };
}
