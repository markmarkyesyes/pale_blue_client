import { combineReducers } from "redux";
import { submit } from "./submit";
import { session } from './session';
import { dotsList } from './dotsList';
import { userLocation } from './userLocation';
import { camera } from './camera';

export default combineReducers({
  camera,
  userLocation,
  session,
  dotsList,
  submit
});
