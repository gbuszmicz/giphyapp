import { expect } from 'chai';
import { List, Map, fromJS } from 'immutable';
import { rootReducer } from '../rootReducer';
import { 
  REQUEST_TRENDING, 
  REQUEST_TRENDING_SUCCESS,
  REQUEST_TRENDING_FAILED,
  REQUEST_SEARCH, 
  REQUEST_SEARCH_SUCCESS,
  REQUEST_SEARCH_FAILED,
  SET_CURRENT_SEARCH
} from '../../actions/network'

describe('Reducers', () => {

  // ------ Trending reducer
  describe('trending', () => {
    it('has an initial state', () => {
      const action = { type: 'whatever' }; // None of the allowed types
      const nextState = rootReducer(undefined, action);
      const initialState = Map({
        isFetching: false,
        entries: [],
        pagination: {},
        error: null,
        currentSearch: ''
      })
      expect(nextState.toJS()).to.deep.equal(initialState.toJS());
    });

    it('should handle REQUEST_TRENDING', () => {
      const action = { type: REQUEST_TRENDING };
      const nextState = rootReducer(undefined, action);
      expect(nextState.get('isFetching')).to.equal(true);
      expect(nextState.get('error')).to.equal(null);
    });

    it('should handle REQUEST_TRENDING_SUCCESS', () => {
      const action = {
        type: REQUEST_TRENDING_SUCCESS,
        entries: [{
          id: 'aaa'
        }]
      };
      const nextState = rootReducer(undefined, action);
      expect(nextState.get('isFetching')).to.equal(false);
      expect(nextState.get('error')).to.equal(null);
      expect(nextState.get('entries')).to.have.length(1);
    });

    it('should handle REQUEST_TRENDING_FAILED', () => {
      const error = new Error('Oh no!');
      const action = {
        type: REQUEST_TRENDING_FAILED,
        error
      };
      const nextState = rootReducer(undefined, action);
      expect(nextState.get('isFetching')).to.equal(false);
      expect(nextState.get('error')).to.equal(error);
    });
  });

  // ------ Search reducer
  describe('search', () => {
    it('has an initial state', () => {
      const action = { type: 'whatever' }; // None of the allowed types
      const nextState = rootReducer(undefined, action);
      expect(nextState.toJS()).to.deep.equal(Map({
        isFetching: false,
        entries: [],
        pagination: {},
        error: null,
        currentSearch: ''
      }).toJS());
    });


    it('should handle SET_CURRENT_SEARCH', () => {
      const action = { 
        type: SET_CURRENT_SEARCH, 
        query: 'cats' 
      };
      const nextState = rootReducer(undefined, action);
      expect(nextState.get('currentSearch')).to.equal('cats');
    });

    it('should handle REQUEST_SEARCH', () => {
      const action = { 
        type: REQUEST_SEARCH,
        query: 'cats' 
      };
      const nextState = rootReducer(undefined, action);
      expect(nextState.get('isFetching')).to.equal(true);
      expect(nextState.get('error')).to.equal(null);
    });

    it('should handle REQUEST_SEARCH_SUCCESS', () => {
      const action = {
        type: REQUEST_SEARCH_SUCCESS,
        entries: [{
          id: 'aaa'
        }],
        query: 'cats'
      };
      const nextState = rootReducer(undefined, action);
      expect(nextState.get('isFetching')).to.equal(false);
      expect(nextState.get('error')).to.equal(null);
      expect(nextState.get('entries')).to.have.length(1);
    });

    it('should handle REQUEST_SEARCH_FAILED', () => {
      const error = new Error('Oh no!');
      const action = {
        type: REQUEST_SEARCH_FAILED,
        error,
        query: 'cats'
      };
      const nextState = rootReducer(undefined, action);
      expect(nextState.get('isFetching')).to.equal(false);
      expect(nextState.get('error')).to.equal(error);
    });

  });

});