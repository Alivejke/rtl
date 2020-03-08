import * as tvmaze from "../../api/tvmaze/";
import { shows as showsSchema } from "../../api/tvmaze/schema";

export const FETCH_SHOWS_PENDING = "FETCH_SHOWS_PENDING";
export const FETCH_SHOWS_SUCCESS = "FETCH_SHOWS_SUCCESS";
export const FETCH_SHOWS_ERROR = "FETCH_SHOWS_ERROR";

export function fetchShowsPending() {
  return {
    type: FETCH_SHOWS_PENDING,
  }
}

export function fetchShowsSuccess(payload) {
  return {
    type: FETCH_SHOWS_SUCCESS,
    payload
  }
}

export function fetchShowsError(error) {
  return {
    type: FETCH_SHOWS_ERROR,
    error
  }
}

export function fetchShows(ids) {
  return (dispatch, getState) => {
    const { shows: { result } } = getState();
    const unavaliableShowsIds = ids.filter((id) => !result.includes(id));

    dispatch({
      types: [
        FETCH_SHOWS_PENDING,
        FETCH_SHOWS_SUCCESS,
        FETCH_SHOWS_ERROR
      ],
      shouldCallAPI: () => !!unavaliableShowsIds.length,
      callAPI: () => tvmaze.fetchShows(unavaliableShowsIds),
      params: { ids: unavaliableShowsIds },
      schema: showsSchema
    });
  }
}

