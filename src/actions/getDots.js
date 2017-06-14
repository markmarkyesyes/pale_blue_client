export const DOT_API_START = 'DOT_API_START';
export const GET_DOTS_SUCCESS = 'GET_DOTS_SUCCESS';
export const DOT_API_FAILURE = 'DOT_API_FAILURE';

export function dotApiStart() {
  return {
    type: DOT_API_START
  };
}

export function getDotsSuccess(data) {
  return {
    type: GET_DOTS_SUCCESS,
    data
  };
}

export function dotApiFailure(error) {
  return {
    type: DOT_API_FAILURE,
    error
  };
}


export function getDots() {
  return dispatch => {
    dispatch(dotApiStart());

    fetch("api/v1/content")
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(dotsList => {
        dispatch(getDotsSuccess(dotsList));
      })
      .catch(error => {
        console.log(error);
        dispatch(dotApiFailure(error));
      });
  };

}
