import { createSelector } from "reselect";
import { denormalize } from "normalizr";

import {
  FETCH_EPISODES_PENDING,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_ERROR,
  FETCH_EPISODE_PENDING,
  FETCH_EPISODE_SUCCESS,
  FETCH_EPISODE_ERROR
} from "../actions";
import {
  episodes as edisodesSchema,
  episode as edisodeSchema
} from "../../api/tvmaze/schema";

const initialState = {
  pending: false,
  entities: {
    episodes: {}
  },
  result: [],
  error: null
};

export default function episodesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EPISODE_PENDING:
    case FETCH_EPISODES_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_EPISODES_SUCCESS:
      return {
        ...state,
        pending: false,
        entities: {
          ...state.entities,
          episodes: Object.assign(
            {},
            state.entities.episodes,
            action.payload.entities.episodes
          )
        },
        result: [...state.result, ...action.payload.result]
      };
    case FETCH_EPISODE_SUCCESS:
      return {
        ...state,
        pending: false,
        entities: {
          ...state.entities,
          episodes: {
            ...state.entities.episodes,
            ...action.payload.entities.episodes
          }
        },
        result: [...state.result, action.payload.result]
      };
    case FETCH_EPISODE_ERROR:
    case FETCH_EPISODES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const makeGetEpisodesByShow = id =>
  createSelector(
    state => state.shows.entities.shows[id].episodes,
    state => state.episodes.entities,
    (episodesIds, episodes) => {
      return denormalize(episodesIds, edisodesSchema, episodes) || [];
    }
  );
export const getEpisodesPending = state => state.episodes.pending;
export const getEpisodesError = state => state.episodes.error;
export const makeGetEpisode = id =>
  createSelector(
    state => state.episodes.entities,
    entities => {
      return denormalize(id, edisodeSchema, entities);
    }
  );
