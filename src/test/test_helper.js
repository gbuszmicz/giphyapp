/* Monkey patch react native to use mocha + enzyme */
require('react-native-mock/mock');
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiEnzyme from 'chai-enzyme'

// Setup globals / chai
// global.__DEV__ = true;
// global.expect = chai.expect;
chai.use(chaiImmutable);
chai.use(chaiEnzyme());