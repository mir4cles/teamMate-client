import { EVENT_DETAILS_FETCHED } from "./actions";

const initialState = {
  attandees: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case EVENT_DETAILS_FETCHED:
      return { ...state, ...payload };

    default:
      return state;
  }
};
