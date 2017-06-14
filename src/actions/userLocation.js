export const GET_USER_LOCATION_START = "GET_USER_LOCATION_START",
             GET_USER_LOCATION_SUCCESS = "GET_USER_LOCATION_SUCCESS",
             GET_USER_LOCATION_FAILURE = "GET_USER_LOCATION_FAILURE";

 export function getUserLocationStart() {
   return {
     type: GET_USER_LOCATION_START
   };
 }

 export function getUserLocationSuccess(data) {
   return {
     type: GET_USER_LOCATION_SUCCESS,
     data
   };
 }

 export function getUserLocationFailure(error) {
   return {
     type: GET_USER_LOCATION_FAILURE,
     error
   };
}

export function getUserLocation() {
  return dispatch => {
    dispatch(getUserLocationStart());

    navigator.geolocation.getCurrentPosition(
      position => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        dispatch(getUserLocationSuccess({ lng, lat }));
      }, error => {
        console.error(error);
        dispatch(getUserLocationFailure(error));
      }
    );
  }
}
