/*
 * Network actions
 */

import { GiphyAuth } from '../configs/Credentials';

// ---- Actions
// An action is a plain object that represents an intention to change the state. 
// Actions are the only way to get data into the store.
export const REQUEST_TRENDING_SUCCESS = 'REQUEST_TRENDING_SUCCESS'
export const REQUEST_TRENDING_FAILED = 'REQUEST_TRENDING_FAILED'
export const REQUEST_TRENDING = 'REQUEST_TRENDING'
export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const REQUEST_SEARCH_SUCCESS = 'REQUEST_SEARCH_SUCCESS'
export const REQUEST_SEARCH_FAILED = 'REQUEST_SEARCH_FAILED'
export const SET_CURRENT_SEARCH = 'SET_CURRENT_SEARCH'

// ---- Action creators
// An action creator is, quite simply, a function that creates an action.
// Calling an action creator only produces an action, but does not dispatch it.
// You need to call the store’s dispatch function to actually cause the mutation.
const requestTrendingSuccess = (entries) => ({
  type: REQUEST_TRENDING_SUCCESS,
  entries
})

const requestTrendingFailed = (error) => ({
  type: REQUEST_TRENDING_FAILED,
  error
})

const requestTrending = (quantity) => ({
  type: REQUEST_TRENDING,
  quantity
})

const requestSearch = (query, quantity) => ({
  type: REQUEST_SEARCH,
  query,
  quantity
})

const requestSearchSuccess = (query, entries, pagination) => ({
  type: REQUEST_SEARCH_SUCCESS,
  entries,
  pagination,
  query
})

const requestSearchFailed = (query, error) => ({
  type: REQUEST_SEARCH_FAILED,
  query,
  error
})

export const setCurrentSearch = (query) => ({
  type: SET_CURRENT_SEARCH,
  query
})

export const search = (query, quantity, offset = 0) => {
  return dispatch => {
    dispatch(requestSearch(query, quantity)); 
    let resource = '/search';
    let queryParams = 'api_key=' + GiphyAuth.API_KEY;
    queryParams += '&limit=' + quantity;
    queryParams += '&q=' + query;
    queryParams += '&offset=' + offset;
    let url = GiphyAuth.API_ENDPOINT + resource + '?' + queryParams;
    return fetch(url, {})
      .then(response => response.json())
      // .then(response => response.data)
      .then(entries => dispatch(requestSearchSuccess(query, entries.data, entries.pagination)))
      .catch(err => dispatch(requestSearchFailed(query, err)));
  };
}

export const fetchTrending = (quantity) => {
  return dispatch => {
    dispatch(requestTrending(quantity));  // Spinner
    let resource = '/trending';
    let queryParams = 'api_key=' + GiphyAuth.API_KEY;
    queryParams += '&limit=' + quantity;
    let url = GiphyAuth.API_ENDPOINT + resource + '?' + queryParams;
    return fetch(url, {})
      .then(response => response.json())
      .then(response => response.data)
      .then(entries => dispatch(requestTrendingSuccess(entries)))
      .catch(err => dispatch(requestTrendingFailed(err)));
  };
}
