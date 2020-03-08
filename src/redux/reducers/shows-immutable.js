// TODO: remove
import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import { fromJS } from "immutable";

import {
  FETCH_SHOWS_PENDING,
  FETCH_SHOWS_SUCCESS,
  FETCH_SHOWS_ERROR
} from "../actions";
import { shows as showsSchema } from "../../api/tvmaze/schema";

const initialState = fromJS({
  pending: false,
  entities: {
    shows: {},
  },
  result: [],
  error: null
});

export default function showsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_SHOWS_PENDING: 
      return state.set('pending', true);
    case FETCH_SHOWS_SUCCESS:
      return state.withMutations((s) => {
        s.set('pending', false)
         .set('entities', s.get('entities').mergeDeep(fromJS(action.response.entities)))
         .set('result', s.get('result').merge(fromJS(action.response.result)))
      });
    case FETCH_SHOWS_ERROR:
      return state.withMutations((s) => {
        s.set('pending', false)
         .set('error', action.error);
      });
    default: 
      return state;
  }
}

export const getShows = createSelector(
  (state) => state.getIn(['shows', 'result']),
  (state) => state.getIn(['shows', 'entities']),
  (result, entities) => denormalize(result, showsSchema, entities)
);
export const getShowsPending = (state) => state.shows.pending;
export const getShowsError = (state) => state.shows.error;
export const makeGetShow = (id) => createSelector(
  (state) =>  state.getIn(['shows', 'entities', 'shows']),
  (shows) => shows.get(id)
);
