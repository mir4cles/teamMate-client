import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";

export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";

export const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: events,
});

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    const eventsCount = getState().events.length;
    dispatch(appLoading());
    const response = await axios.get(
      `${apiUrl}/events?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${eventsCount}`
    );
    dispatch(fetchEventsSuccess(response.data.events.rows));
    dispatch(appDoneLoading());
  };
};
