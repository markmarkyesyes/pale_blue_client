export const GET_USER_LOCATION_START = "GET_USER_LOCATION_START",
             GET_USER_LOCATION_SUCCESS = "GET_USER_LOCATION_SUCCESS",
             GET_USER_LOCATION_FAILURE = "GET_USER_LOCATION_FAILURE";

 export function requestStart() {
   return {
     type: GET_USER_LOCATION_START
   };
 }

 export function requestSuccess(data) {
   return {
     type: GET_USER_LOCATION_SUCCESS,
     data
   };
 }

 export function requestFailure(error) {
   return {
     type: GET_USER_LOCATION_FAILURE,
     error
   };
}

export function getUserLocation() {
  return dispatch => {
    dispatch(requestStart());

    navigator.geolocation.getCurrentPosition(
      position => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        dispatch(requestSuccess({ lng, lat }));
      }, error => {
        console.error(error);
        dispatch(requestFailure(error));
      }
    );
  }
}
