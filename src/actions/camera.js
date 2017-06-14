export const SET_CAMERA_LOCATION = "SET_CAMERA_LOCATION";

export function setCameraLocation(location) {
  return {
    type: SET_CAMERA_LOCATION,
    data: location
  };
}
