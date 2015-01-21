/*
 * Ticketbase client
 * @license MIT
 */

var TB = {};

/**
 * TB.setKey() : setKey(key)
 * Sets the API key to given `key` string. Use this before running any other
 * function, otherwise, errors will be thrown.
 *
 *     TB.setKey('a0b1cd30a91adc0ffee');
 */

TB.setKey = function (key) {
  TB._key = key;
  return TB;
};

/**
 * TB.base:
 * The base URL path for the API server (string).
 *
 *     TB.base = 'http://api.ticketbase.com/v1';
 */

TB.base = 'http://api.ticketbase.com/v1';

/**
 * TB._request() : _request(method, url, options, callback)
 * (Internal) AJAX library. See [then-request].
 * [then-request]: https://www.npmjs.com/package/then-request
 *
 *     request('GET', 'http://ticketbase.com', { qs: { api_key: '...' } })
 *     .then(function (res) {
 *       res.statusCode == 200
 *       res.headers['content-type']
 *       res.getBody()
 *     });
 */

TB._request = require('then-request');

/**
 * TB.request() : request(method, path, data)
 * Performs an API request. The client takes care of API authentication details
 * for you (as long as you used `TB.setKey()`).
 *
 * Returns a promise that will resolve to the JSON data, or reject to an error.
 *
 * `data` may be an Object that will be sent as the POST body.
 *
 *     // Performs a GET on http://api.ticketbase.com/v1/events.json.
 *
 *     TB.setKey('aabbccdd');
 *     TB.request('GET', '/events.json')
 *       .then(function (events) {
 *         events == [ ...list of events... ]
 *       })
 *
 * Here are some errors that can be thrown:
 *
 *     TB.request('GET', '/events.json')
 *       .catch(function (err) {
 *         // General errors:
 *         err.message == "Ticketbase: no API key..."
 *         err.message == "Ticketbase: CORS error. This site is..."
 *
 *         // HTTP errors:
 *         err.message == "Ticketbase: 401 Unauthorized"
 *         err.statusCode == 401
 *         err.body == { ... }
 *       })
 */

TB.request = function (method, path, data) {
  var key = TB._key;
  if (!key) return Promise.reject(new Error(
    "Ticketbase: No API key. Use TB.setKey() first."));

  var url = TB.base + path;
  var options = {
    qs: { api_key: key },
    json: data
  };

  return TB._request(method, url, options)
  .then(function (res) {
    // then-request uses `0` for this for some reason.
    if (res.statusCode === 0)
      throw corsError();

    // Only allow OK responses, throw 401's et al.
    if (!/^2../.test(res.status))
      throw apiError(res);

    // Return the API's JSON body result.
    return parseBody(res);
  });
};

/*
 * scope
 */

var Scope =
TB.Scope = function Scope() {};

/*
 * event
 */

TB.event = function () {
  return new Scope();
};

/*
 * export
 */

module.exports = TB;

/*
 * Helpers
 */

function corsError () {
  return new Error(
    "Ticketbase: CORS error: "+
    "this site is not allowed to access the Ticketbase API.");
}

function apiError (res) {
  var err = new Error("Ticketbase: " + res.headers.status);
  err.body = parseBody(res);
  err.statusCode = res.statusCode;
  err.headers = res.headers;
  throw err;
}

function parseBody (res) {
  var
    body = res.body.toString(),
    type = res.headers['content-type'];

  if (type === 'application/json')
    return JSON.parse(body);
  else
    return body;
}
