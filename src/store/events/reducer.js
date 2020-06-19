import { FETCH_EVENTS_SUCCESS } from "./actions";
// import { HEART_INCREMENT } from "../artworkDetails/actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return [...state, ...action.payload];

    // case HEART_INCREMENT:
    //   return state.map((artwork) =>
    //     artwork.id === action.payload
    //       ? { ...artwork, hearts: artwork.hearts + 1 }
    //       : artwork
    //   );

    default:
      return state;
  }
};
