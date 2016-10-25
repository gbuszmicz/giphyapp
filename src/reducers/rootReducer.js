import { Map, List, fromJS } from 'immutable';
import { 
  REQUEST_TRENDING, 
  REQUEST_TRENDING_SUCCESS,
  REQUEST_TRENDING_FAILED,
  REQUEST_SEARCH, 
  REQUEST_SEARCH_SUCCESS,
  REQUEST_SEARCH_FAILED,
  SET_CURRENT_SEARCH
} from '../actions/network'

const setCurrentSearch = (state, query) => {
  return state
    .set('currentSearch', query)
}

const request = (state) => {
  return state
    .set('isFetching', true)
    .set('error', null)
}

const requestSuccess = (state, entries, pagination) => {
  return state
    .set('isFetching', false)
    .set('error', null)
    .set('entries', entries)
    .set('pagination', pagination)
}

const requestFailed = (state, error) => {
  return state
    .set('isFetching', false)
    .set('error', error)
}

const initialState = Map({
  isFetching: false,
  entries: [],
  pagination: {},
  error: null,
  currentSearch: ''
});

// ---- Redures
// Actions describe the fact that something happened, 
// but don't specify how the application's state changes in response. 
// This is the job of a reducer.
export function rootReducer(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_SEARCH:
      let query = action.query;
      return setCurrentSearch(state, query);

    case REQUEST_SEARCH:
    case REQUEST_TRENDING:
      return request(state);

    case REQUEST_SEARCH_SUCCESS:
    case REQUEST_TRENDING_SUCCESS:
      let entries = action.entries;
      let pagination = action.pagination;
      return requestSuccess(state, entries, pagination)

    case REQUEST_SEARCH_FAILED:
    case REQUEST_TRENDING_FAILED:
      let error = action.error;
      return requestFailed(state, error)

    default:
      return state;
  }
}