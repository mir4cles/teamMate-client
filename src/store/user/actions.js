import { apiUrl } from "../../config/constants";

import axios from "axios";

import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const ATTEND_EVENT = "ATTEND_EVENT";
export const UPDATE_EVENTS = "UPDATE_EVENTS";
export const CANCEL_ATTEND_EVENT = "CANCEL_ATTEND_EVENT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(
        showMessageWithTimeout("success", true, "Account created. Have fun!")
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("error", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("error", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
      console.log(response.data);
      dispatch(
        setMessage("success", false, `Welcome back ${response.data.name}!`)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        dispatch(setMessage("error", false, error.response.data.message));
      } else {
        dispatch(setMessage("error", false, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const createEvent = (
  title,
  startDate,
  endDate,
  location,
  sportType,
  description,
  outdoor,
  maxPlayers
) => {
  return async (dispatch, getState) => {
    const { id, token } = selectUser(getState());
    dispatch(appLoading());

    const response = await axios.post(
      `${apiUrl}/events`,
      {
        title,
        startDate,
        endDate,
        location,
        sportType,
        description,
        outdoor,
        maxPlayers,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setMessage("success", true, response.data.message));
    dispatch(appDoneLoading());
  };
};

export const attendEvent = (eventId) => {
  return async (dispatch, getState) => {
    const { id, token } = selectUser(getState());
    dispatch(appLoading());

    try {
      const response = await axios.post(
        `${apiUrl}/events/${eventId}/rsvp`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(attendEventSuccess(response.data.user));
      dispatch(appDoneLoading());
    } catch (error) {
      dispatch(
        showMessageWithTimeout(
          "succes",
          false,
          "You are already attending this event",
          3000
        )
      );
    }
  };
};

const attendEventSuccess = (user) => {
  return {
    type: ATTEND_EVENT,
    payload: user,
  };
};

export const cancelAttendEvent = (eventId) => {
  return async (dispatch, getState) => {
    const { id, token } = selectUser(getState());
    dispatch(appLoading());
    try {
      await axios.delete(`${apiUrl}/events/${eventId}/rsvp`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(cancelAttendEventSuccess(id));
      dispatch(appDoneLoading());
    } catch (error) {
      dispatch(setMessage("warning", true, "You already cancelled this event"));
    }
  };
};

const cancelAttendEventSuccess = (userId) => {
  return {
    type: CANCEL_ATTEND_EVENT,
    payload: userId,
  };
};

export const editEvent = (
  eventId,
  title,
  startDate,
  endDate,
  location,
  sportType,
  description,
  outdoor,
  maxPlayers
) => {
  return async (dispatch, getState, history) => {
    const { id, token } = selectUser(getState());
    dispatch(appLoading());

    const response = await axios.patch(
      `${apiUrl}/events/${eventId}`,
      {
        title,
        startDate,
        endDate,
        location,
        sportType,
        description,
        outdoor,
        maxPlayers,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setMessage("success", true, "Event successfully updated"));
    dispatch(appDoneLoading());
  };
};
