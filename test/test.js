var expect = require('chai').expect;
var Promise = this.Promise || require('promise');
var TB;

beforeEach(function () {
  global.sinon = require('sinon').sandbox.create();
});

afterEach(function () {
  global.sinon.restore();
});

before(function () {
  TB = require('../index');
  TB.setKey('.');
  // TB.base = 'http://api.dev.local:3000/v1';
});

describe('API keys', function () {
  it('resolves to an error before API keys', function () {
    TB.setKey(undefined);
    TB.request('GET', '/')
      .then(errExpected, function (err) {
        expect(err.match(/No API key/));
      });
  });

  afterEach(function () {
    TB.setKey('.');
  });
});

describe('TB.request', function () {
  beforeEach(function () {
    stubAjax(function () {
      return stubResponse(401, "Unauthorized", { error: "401 Unauthorized" });
    });
  });

  it('performs a GET request', function () {
    TB.request('GET', '/events.json');
    expect(TB._request.calledWith(
      'GET', 'http://api.ticketbase.com/v1/events.json'))
      .eql(true);
  });

  it('handles 401 cases', function () {
    return TB.request('GET', '/events.json')
      .then(function () {
        throw new Error("Error was expected");
      }, function (err) {
        expect(err.message).eql("Ticketbase: 401 Unauthorized");
        expect(err.statusCode).eql(401);
        expect(err.body).eql({ error: "401 Unauthorized" });
        return true;
      });
  });
});

describe('TB.request: CORS errors', function () {
  beforeEach(function () {
    stubAjax(function () {
      return stubResponse(0, "", {});
    });
  });

  it('handles CORS errors', function () {
    return TB.request('GET', '/events.json')
      .then(function () {
        throw new Error("Error was expected");
      }, function (err) {
        expect(err.message).match(/Ticketbase: CORS error/);
        return true;
      });
  });
});

/*
 * Simple request stubbing
 */

function stubAjax (fn) {
  sinon.stub(TB, '_request', fn);
}

function stubResponse(code, msg, body) {
  return Promise.resolve({
    statusCode: code,
    headers: {
      'content-type': 'application/json',
      status: '' + code + ' ' + msg,
    },
    body: JSON.stringify(body)
  });
}


function errExpected () {
  throw new Error("Error was expected");
}
