import { combineReducers } from "redux";
import { session } from './session';
import { dotsList } from './dotsList';
import { likesList } from './likesList';
import { myLiked } from './myLiked';
import { userLocation } from './userLocation';
import { camera } from './camera';
import { selectedContent } from './selectedContent';

export default combineReducers({
  camera,
  userLocation,
  session,
  dotsList,
  likesList,
  myLiked,
  selectedContent
});
