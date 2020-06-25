import { EVENT_DETAILS_FETCHED } from "./actions";
import { ATTEND_EVENT, CANCEL_ATTEND_EVENT } from "../user/actions";

const initialState = {
  attending: [],
  user: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case EVENT_DETAILS_FETCHED:
      return { ...state, ...payload };

    case ATTEND_EVENT:
      return {
        ...state,
        attending: [...state.attending, payload],
      };

    case CANCEL_ATTEND_EVENT:
      return {
        ...state,
        attending: [...state.attending.filter((rsvp) => rsvp.id !== payload)],
      };

    default:
      return state;
  }
};
