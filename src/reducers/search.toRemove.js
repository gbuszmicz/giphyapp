
// import { Map, fromJS } from 'immutable';
// import { 
//   REQUEST_SEARCH, 
//   REQUEST_SEARCH_SUCCESS,
//   REQUEST_SEARCH_FAILED,
//   SET_CURRENT_SEARCH
// } from '../actions/network';
// import { rootReducer } from './rootReducer';

// const setCurrentSearch = (state, query) => {
//   return state
//     .set('currentSearch', query)
// }

// // const requestSearch = (currentState, action) => {
// //   return currentState
// //     .set('searches')
// //     .set(action.query, rootReducer(currentState, action))
//     // .setIn(['searches', action.query], rootReducer(currentState, action))
// // }

// const initialState = fromJS({
//   currentSearch: '',
//   // isFetching: false,
//   // entries: Map(),
//   // error: null
// });

// export function searchReducer(state = initialState, action) {
//   switch(action.type) {
//     case SET_CURRENT_SEARCH:
//       let query = action.query;
//       return setCurrentSearch(state, query);

//     case REQUEST_SEARCH:
//     case REQUEST_SEARCH_SUCCESS:
//     case REQUEST_SEARCH_FAILED:
//       // let currentState = state.get(action.query) || AppinitialState;
//       // return requestSearch(currentState, action);
//       // console.log(action.entries)
//       return rootReducer(state, action);

//     default :
//       return state;
//   }
// }
