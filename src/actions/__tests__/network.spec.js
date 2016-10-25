import { List, Map, fromJS } from 'immutable';
import url from 'url';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';

import { fetchTrending, search } from '../network';

describe('Actions', () => {
  describe('trending', () => {
    const urlRegex = /\/trending/;
    afterEach(() => {
      fetchMock.restore();
    });

    it('should call fetch with /trending with api_key and limit', () => {
      fetchMock.mock(urlRegex, 200);
      let calledAction;
      const fakeDispatcher = (action) => {
        calledAction = action;
      };

      const next = fetchTrending(1);
      next(fakeDispatcher);

      expect(fetchMock.called(urlRegex)).to.equal(true);
      expect(fetchMock.lastOptions(urlRegex)).to.deep.equal({});

      let calledUrl = fetchMock.lastUrl(urlRegex);
      let queryString = url.parse(calledUrl, true).query;

      expect(queryString.api_key).to.not.be.null;
      expect(queryString.limit).to.equal("1");
    });

    it('should dispatch REQUEST_TRENDING action', () => {
      fetchMock.mock(urlRegex, 200);
      let calledAction;
      const fakeDispatcher = (action) => {
        calledAction = action;
      };

      const next = fetchTrending(1);
      next(fakeDispatcher);

      expect(calledAction).to.deep.equal({
        type: 'REQUEST_TRENDING',
        quantity: 1
      });
    });

    it('should dispatch REQUEST_TRENDING_SUCCESS on success', function(done) {
      fetchMock.get(urlRegex, {
        data: [{id: 'aaa'}]
      });
      let lastCalledAction = null;
      const fakeDispatcher = (action) => {
        lastCalledAction = action;
      };

      const next = fetchTrending(1);
      next(fakeDispatcher).then(function() {
        try {
          expect(lastCalledAction).to.deep.equal({
            type: 'REQUEST_TRENDING_SUCCESS',
            entries: [{id: 'aaa'}]
          });
          done();
        } 
        catch(e) { // if action type name change for example, or "entries" name
          done(e);
        }
      });
    });

    it('should dispatch REQUEST_TRENDING_FAILED on success', function(done) {
      const error = new Error('Oh no');
      fetchMock.mock(urlRegex, {throws: error});
      let lastCalledAction = null;
      const fakeDispatcher = (action) => {
        lastCalledAction = action;
      };

      const next = fetchTrending(1);
      next(fakeDispatcher).then(function() {
        try {
          expect(lastCalledAction.type).to.equal('REQUEST_TRENDING_FAILED');
          expect(lastCalledAction.error).to.equal(error);
          done();
        } 
        catch(e) {
          done(e);
        }
      });
    });

  });

});