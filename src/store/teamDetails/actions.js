import axios from "axios";
import { apiUrl } from "../../config/constants";

export const TEAM_DETAILS_FETCHED = "TEAM_DETAILS_FETCHED";

const teamDetailsFetched = (team) => ({
  type: TEAM_DETAILS_FETCHED,
  payload: team,
});

export const fetchTeamById = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/teams/${id}`);
    dispatch(teamDetailsFetched(response.data.team));
  };
};
