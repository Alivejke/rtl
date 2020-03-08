import * as tvmaze from "../../api/tvmaze/";
import {
  episodes as episodesSchema,
  episode as episodeSchema
} from "../../api/tvmaze/schema";

export const FETCH_EPISODES_PENDING = "FETCH_EPISODES_PENDING";
export const FETCH_EPISODES_SUCCESS = "FETCH_EPISODES_SUCCESS";
export const FETCH_EPISODES_ERROR = "FETCH_EPISODES_ERROR";

export const FETCH_EPISODE_PENDING = "FETCH_EPISODE_PENDING";
export const FETCH_EPISODE_SUCCESS = "FETCH_EPISODE_SUCCESS";
export const FETCH_EPISODE_ERROR = "FETCH_EPISODE_ERROR";

export function fetchEpisodesPending() {
  return {
    type: FETCH_EPISODES_PENDING
  };
}

export function fetchEpisodesSuccess(payload) {
  return {
    type: FETCH_EPISODES_SUCCESS,
    payload
  };
}

export function fetchEpisodesError(error) {
  return {
    type: FETCH_EPISODES_ERROR,
    error
  };
}

export function fetchEpisodesByShow(id) {
  return (dispatch, getState) => {
    const {
      shows: {
        entities: { shows }
      }
    } = getState();

    dispatch({
      types: [
        FETCH_EPISODES_PENDING,
        FETCH_EPISODES_SUCCESS,
        FETCH_EPISODES_ERROR
      ],
      shouldCallAPI: () => !shows[id].episodes,
      callAPI: () => tvmaze.fetchEpisodesByShow(id),
      params: { id },
      schema: episodesSchema
    });
  };
}

export function fetchEpisodePending() {
  return {
    type: FETCH_EPISODE_PENDING
  };
}

export function fetchEpisodeSuccess(payload) {
  return {
    type: FETCH_EPISODE_SUCCESS,
    payload
  };
}

export function fetchEpisodeError(error) {
  return {
    type: FETCH_EPISODE_ERROR,
    error
  };
}

export function fetchEpisode(id) {
  return (dispatch, getState) => {
    const {
      episodes: {
        entities: { episodes }
      }
    } = getState();

    dispatch({
      types: [
        FETCH_EPISODE_PENDING,
        FETCH_EPISODE_SUCCESS,
        FETCH_EPISODE_ERROR
      ],
      shouldCallAPI: () => !episodes[id],
      callAPI: () => tvmaze.fetchEpisode(id),
      params: { id },
      schema: episodeSchema
    });
  };
}
