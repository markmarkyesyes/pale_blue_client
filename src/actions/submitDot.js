import { dotApiStart, dotApiFailure } from "./getDots";
import socket from '../websockets';

export const SUBMIT_DOT_SUCCESS = "SUBMIT_DOT_SUCCESS";

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
  const { contentType, data, lng, lat, userId } = content;
  const formData = `contentType=${contentType}&data=${data}&lng=${lng}&lat=${lat}&userId=${userId}`;
  console.log("submitting content");
  let token = localStorage.getItem("token");
  let config = {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `JWT ${token}`
    }
  };
  return dispatch => {
    dispatch(dotApiStart());
    fetch("api/v1/content", config)
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(json => {
        if (json.error) {
          dispatch(dotApiFailure(json.error));
        } else {
          console.log("successfully added content");
          socket.emit('created content', json.content);
          dispatch(submitDotSuccess(json.content));
        }
      })
      .catch(err => {
        dispatch(dotApiFailure(err));
      });
  };
}
