import { combineReducers } from "redux";

import shows from "./shows";
import episodes from "./episodes";

export default combineReducers({
  shows,
  episodes
});
