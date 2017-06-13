import {combineReducers} from 'redux';

import { session } from './session';
import { dotsList } from './dotsList';
import { userLocation } from './userLocation';

export default combineReducers({
  userLocation,
  session,
  dotsList
});
