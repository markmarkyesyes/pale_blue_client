import {combineReducers} from 'redux';

import { session } from './session';
import { dotsList } from './dotsList';

export default combineReducers({
  session,
  dotsList
});