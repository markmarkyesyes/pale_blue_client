export const SUBMIT_START = "SUBMIT_START";
export const SUBMIT_SUCCESS = "SUBMIT_SUCCESS";
export const SUBMIT_FAILURE = "SUBMIT_FAILURE";

export function submitStart() {
  return {
    type: SUBMIT_START
  };
}

import updateDotsList from "./getDotsActions";
export function submitSuccess(message, data) {
  dispatch(updateDotsList(data));
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

export function submitContent(content) {
  console.log("submitting content");
  let jsonBody = {
    content,
    token: localStorage.getItem("jwt_token"),
    _id: localStorage.getItem("user_id")
  };
  let config = {
    method: "POST",
    body: JSON.stringify(jsonBody),
    headers: { "Content-Type": "application/json" }
  };
  return dispatch => {
    dispatch(submitStart());
    fetch("http://localhost:3030/api/v1/submit", config)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.error);
        } else {
          return res.json();
        }
      })
      .then(response => {
        dispatch(submitSuccess("Successfully stored", response));
      })
      .catch(err => {
        dispatch(submitFailure(err));
      });
  };
}
