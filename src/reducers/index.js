import { combineReducers } from "redux";
import { submit } from "./submit";
import { session } from './session';
import { dotsList } from './dotsList';
import { userLocation } from './userLocation';

export default combineReducers({
  userLocation,
  session,
  dotsList,
  submit
});
