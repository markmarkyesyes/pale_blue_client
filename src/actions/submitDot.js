import dotApiStart from "./getDotsActions";
import dotApiFailure from "./getDotsActions";

export const SUBMIT_DOT_SUCCESS = 'SUBMIT_DOT_SUCCESS';


export function submitDotSuccess(data) {
  return {
    type: SUBMIT_DOT_SUCCESS,
    data
  };
}

export function submitDot(content) {
  // Expecting content to be an object with
  // lng, lat, contentType, data, and userId
  // (data at the moment only supports text)
  console.log("submitting content");
  let token = localStorage.getItem("token");
  let config = {
    method: "POST",
    body: JSON.stringify(content),
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  };
  return dispatch => {
    dispatch(dotApiStart());
    fetch("api/v1/submit", config)
      .then(res => {
        if (res.error || res.status >= 400) {
          throw new Error(res.error);
        } else {
          return res.json();
        }
      })
      .then(json => {
        if (json.error) {
          dispatch(dotApiFailure(error));
        } else {
          dispatch(submitDotSuccess(json.content));
        }
      })
      .catch(err => {
        dispatch(dotApiFailure(err));
      });
  };
}
