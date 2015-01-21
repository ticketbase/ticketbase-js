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
  // TB.base = 'http://api.dev.local:3000/v1';
});

describe('API keys', function () {
  it('throws an error before API keys', function () {
    expect(function () {
      TB.request('GET', '/');
    }).to.throw(/No API key/);
  });

  it('throws no errors with an API key', function () {
    expect(function () {
      TB.setKey('.');
      TB.getKey();
    }).not.to.throw(/No API key/);
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
        expect(err.statusCode).eql(401);
        expect(err.body.error).eql("401 Unauthorized");
        expect(err.message).eql("Ticketbase: 401 Unauthorized");
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

