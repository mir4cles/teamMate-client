import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS";

export const fetchTeamsSuccess = (teams) => ({
  type: FETCH_TEAMS_SUCCESS,
  payload: teams,
});

export const fetchTeams = () => {
  return async (dispatch, getState) => {
    const teamsCount = getState().teams.length;
    // const response = await axios.get(
    //   `http://localhost:4000/events?limit=${DEFAULT_PAGINATION_LIMIT}`
    // );
    const response = await axios.get(
      `${apiUrl}/teams?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${teamsCount}`
    );
    // console.log(response.data);
    dispatch(fetchTeamsSuccess(response.data.teams.rows));
  };
};
