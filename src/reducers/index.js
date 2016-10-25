'use strict';

import { combineReducers } from 'redux-immutablejs';
import { rootReducer } from './rootReducer';

export default combineReducers({ 
  app:rootReducer 
})