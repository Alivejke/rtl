import { createSelector } from "reselect";
import { denormalize } from "normalizr";

import {
  FETCH_SHOWS_PENDING,
  FETCH_SHOWS_SUCCESS,
  FETCH_SHOWS_ERROR,
  FETCH_EPISODES_SUCCESS
} from "../actions";
import { shows as showsSchema } from "../../api/tvmaze/schema";

const initialState = {
  pending: false,
  entities: {
    shows: {}
  },
  result: [],
  error: null
};

export default function showsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHOWS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_SHOWS_SUCCESS:
      return {
        ...state,
        pending: false,
        entities: {
          ...state.entities,
          shows: Object.assign(
            {},
            state.entities.shows,
            action.payload.entities.shows
          )
        },
        result: [...state.result, ...action.payload.result]
      };
    case FETCH_SHOWS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case FETCH_EPISODES_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          shows: {
            ...state.entities.shows,
            [action.id]: Object.assign({}, state.entities.shows[action.id], {
              episodes: action.payload.result
            })
          }
        }
      };
    default:
      return state;
  }
}

export const getShows = createSelector(
  state => state.shows.result,
  state => state.shows.entities,
  (result, entities) => denormalize(result, showsSchema, entities)
);
export const getShowsPending = state => state.shows.pending;
export const getShowsError = state => state.shows.error;
export const makeGetShow = id =>
  createSelector(
    state => state.shows.entities.shows,
    shows => shows[id]
  );
