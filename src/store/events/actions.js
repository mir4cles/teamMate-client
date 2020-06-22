import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";

export const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: events,
});

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    const eventsCount = getState().events.length;
    // const response = await axios.get(
    //   `http://localhost:4000/events?limit=${DEFAULT_PAGINATION_LIMIT}`
    // );
    const response = await axios.get(
      `${apiUrl}/events?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${eventsCount}`
    );
    // console.log(response.data);
    dispatch(fetchEventsSuccess(response.data.events.rows));
  };
};
