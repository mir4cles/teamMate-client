import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import events from "./events/reducer";
import eventDetails from "./eventDetails/reducer";
import teams from "./teams/reducer";
import teamDetails from "./teamDetails/reducer";

export default combineReducers({
  appState,
  user,
  events,
  eventDetails,
  teams,
  teamDetails,
});
