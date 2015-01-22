global.chai = require('chai');
global.expect = chai.expect;
chai.use(require('sinon-chai'));

if (global.Promise)
  global.Promise = require('promise');

beforeEach(function () {
  global.sinon = require('sinon').sandbox.create();
});

afterEach(function () {
  global.sinon.restore();
});

before(function () {
  global.TB = require('../index');
  TB.setKey('ejLiDvSsn2ZMzn5Ynncv');
  TB.base = 'http://api.127.0.0.1.xip.io:3000/v1';
});

/*
 * Simple request stubbing
 */

global.stubAjax = function (code, body) {
  beforeEach(function () {
    sinon.stub(TB, '_request', function () {
      return Promise.resolve({
        statusCode: code,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body)
      });
    });
  });
};

global.errExpected = function () {
  throw new Error("Error was expected");
};
