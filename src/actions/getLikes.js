export const LIKE_API_START = "LIKE_API_START";
export const GET_LIKES_SUCCESS = "GET_LIKES_SUCCESS";
export const LIKE_API_FAILURE = "LIKE_API_FAILURE";
export const NEW_LIKE = "NEW_LIKE";

export function likeApiStart() {
  return {
    type: LIKE_API_START
  };
}

export function getLikesSuccess(data) {
  return {
    type: GET_LIKES_SUCCESS,
    data
  };
}

export function newLike(data) {
  return {
    type: NEW_LIKE,
    data
  };
}

export function likeApiFailure(error) {
  return {
    type: LIKE_API_FAILURE,
    error
  };
}

import constants from "../constants";

export function getLikes() {
  return dispatch => {
    dispatch(likeApiStart());
    let token = localStorage.getItem("token");
    let config = {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    };
    fetch(`${constants.baseUrl}/api/v1/like`, config)
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(likesList => {
        dispatch(getLikesSuccess(likesList));
      })
      .catch(error => {
        console.log(error);
        dispatch(likeApiFailure(error));
      });
  };
}