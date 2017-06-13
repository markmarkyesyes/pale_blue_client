export const GET_DOTS_START = 'GET_DOTS_START';
export const GET_DOTS_SUCCESS = 'GET_DOTS_SUCCESS';
export const GET_DOTS_FAILURE = 'GET_DOTS_FAILURE';


export function requestStart() {
  return {
    type: GET_DOTS_START
  };
}

export function requestSuccess(data) {
  return {
    type: GET_DOTS_SUCCESS,
    data
  };
}

export function requestFailure(error) {
  return {
    type: GET_DOTS_FAILURE,
    error
  };
}

export function getDotLocations() {
  return (dispatch) => {
    dispatch(requestStart());

    fetch('api/dots')
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
  }
}
