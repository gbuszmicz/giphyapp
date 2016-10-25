'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => state.toJS() // Transformation necessary because of Immutable.js
});

const combineMiddleware = applyMiddleware( // Order matters! 1.thunk, 2.logger
  thunkMiddleware,
  loggerMiddleware
);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    combineMiddleware
  );
  //HMR config for Redux
  if(module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}