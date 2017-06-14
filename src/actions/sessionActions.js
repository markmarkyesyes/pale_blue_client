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

export function loginUser(creds) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${creds.email}&password=${creds.pass}`
  };
  return dispatch => {
    dispatch(loginStart());
    fetch("http://localhost:3030/api/v1/login", config)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.error);
        } else {
          return res.json();
        }
      })
      .then(response => {
        localStorage.setItem("user_id", response.user._id);
        localStorage.setItem("token", response.token);
        dispatch(loginSuccess(response.user._id));
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

export function regUser(creds) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${creds.email}&password=${creds.pass}`
  };
  return dispatch => {
    dispatch(regStart());
    fetch("http://localhost:3030/api/v1/register", config)
      .then(res => {
        if (res.status >= 400) {
          throw new Error(res.error);
        } else {
          return res.json();
        }
      })
      .then(response => {
        localStorage.setItem("user_id", response.user._id);
        localStorage.setItem("token", response.token);
        dispatch(regSuccess(response.user._id));
      })
      .catch(err => {
        dispatch(regFailure(err));
      });
  };
}
