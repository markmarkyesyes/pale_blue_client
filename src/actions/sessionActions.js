export const LOGIN_START = "LOGIN_START";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function loginStart() {
  return {
    type: LOGIN_START
  };
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

import constants from "../constants";

export function loginUser(email, password) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${email}&password=${password}`
  };
  return dispatch => {
    dispatch(loginStart());
    fetch(`${constants.baseUrl}/api/v1/login`, config)
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.error) {
          throw new Error(`Error: ${response.error}`);
        }
        localStorage.setItem("user_id", response._id);
        localStorage.setItem("token", response.token);
        dispatch(loginSuccess(response._id));
      })
      .catch(err => {
        dispatch(loginFailure(err));
      });
  };
}

export const REG_START = "REG_START";
export const REG_FAILURE = "REG_FAILURE";
export const REG_SUCCESS = "REG_SUCCESS";

export function regStart() {
  return {
    type: REG_START
  };
}

export function regSuccess(data) {
  return {
    type: REG_SUCCESS,
    data
  };
}

export function regFailure(error) {
  return {
    type: REG_FAILURE,
    error
  };
}

export function regUser(email, password) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${email}&password=${password}`
  };
  return dispatch => {
    dispatch(regStart());
    fetch(`${constants.baseUrl}/api/v1/register`, config)
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.error) {
          throw new Error(`Error: ${response.error}`);
        }
        localStorage.setItem("user_id", response._id);
        localStorage.setItem("token", response.token);
        dispatch(regSuccess(response._id));
      })
      .catch(err => {
        dispatch(regFailure(err));
      });
  };
}

export const LOGOUT = "LOGOUT";
export function logout() {
  return {
    type: LOGOUT
  };
}
