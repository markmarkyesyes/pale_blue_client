export const SUBMIT_START = "SUBMIT_START";
export const SUBMIT_SUCCESS = "SUBMIT_SUCCESS";
export const SUBMIT_FAILURE = "SUBMIT_FAILURE";

export function submitStart() {
  return {
    type: SUBMIT_START
  };
}

export function submitSuccess(message) {
  return {
    type: SUBMIT_SUCCESS,
    message
  };
}

export function submitFailure(message) {
  return {
    type: SUBMIT_FAILURE,
    message
  };
}

import updateDotsList from "./getDotsActions";
export function submitContent(content) {
  console.log("submitting content");
  let token = localStorage.getItem("token");
  let jsonBody = { content };
  let config = {
    method: "POST",
    body: JSON.stringify(jsonBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  };
  return dispatch => {
    dispatch(submitStart());
    fetch("http://localhost:3030/api/v1/submit", config)
      .then(res => {
        if (res.error || res.status >= 400) {
          throw new Error(res.error);
        } else {
          return res.json();
        }
      })
      .then(response => {
        dispatch(submitSuccess("Successfully stored"));
        dispatch(updateDotsList(response));
      })
      .catch(err => {
        dispatch(submitFailure(err));
      });
  };
}
