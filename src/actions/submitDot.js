import { dotApiStart, dotApiFailure } from "./getDots";
import socket from "../websockets";

export const SUBMIT_DOT_SUCCESS = "SUBMIT_DOT_SUCCESS";

export function submitDotSuccess(data) {
  return {
    type: SUBMIT_DOT_SUCCESS,
    data
  };
}

import constants from "../constants";

export function submitDot(content, demo = false) {
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
    fetch(`${constants.baseUrl}/api/v1/content`, config)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.error) {
          throw new Error(`Error: ${json.error}`);
        }
        console.log("successfully added content");
        if (demo) {
          socket.emit("start demo", { demoUserId: localStorage.getItem("userId"), demoContentId: json.content._id })
        } else {
          socket.emit("created content", json.content);
        }        
        dispatch(submitDotSuccess(json.content));
      })
      .catch(err => {
        dispatch(dotApiFailure(err));
      });
  };
}
