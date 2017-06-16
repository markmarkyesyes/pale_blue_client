import { likeApiStart, likeApiFailure } from "./getLikes";
import socket from "../websockets";

export const SUBMIT_LIKE_SUCCESS = "SUBMIT_LIKE_SUCCESS";

export function submitLikeSuccess(data) {
  return {
    type: SUBMIT_LIKE_SUCCESS,
    data
  };
}

import constants from "../constants";

export function submitLike(like) {
  // Expecting like to be an object with
  // fromLng, fromLat, fromUserId, and contentId
  const { fromLng, fromLat, fromUserId, contentId } = like;
  const formData = `contentId=${contentId}&fromUserId=${fromUserId}&fromLng=${fromLng}&fromLat=${fromLat}`;
  console.log("submitting like");
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
    dispatch(likeApiStart());
    fetch(`${constants.baseUrl}/api/v1/like`, config)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.error) {
          throw new Error(`Error: ${json.error}`);
        }
        console.log("successfully added like");
        socket.emit("created like", json.like);
        dispatch(submitLikeSuccess(json.like));
      })
      .catch(err => {
        dispatch(likeApiFailure(err));
      });
  };
}
