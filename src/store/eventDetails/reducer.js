import { EVENT_DETAILS_FETCHED } from "./actions";
import { ATTEND_EVENT } from "../user/actions";

const initialState = {
  attandees: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case EVENT_DETAILS_FETCHED:
      return { ...state, ...payload };

    case ATTEND_EVENT:
      return {
        ...state,
        attandees: [...state.attandees, payload],
      };

    default:
      return state;
  }
};
