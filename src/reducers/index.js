import { combineReducers } from "redux";

import { session } from "./session";
import { dotsList } from "./dotsList";
import { submit } from "./submit";

export default combineReducers({
  session,
  dotsList,
  submit
});
