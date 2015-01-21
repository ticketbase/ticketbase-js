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
 * TB.getKey() : getKey()
 * (Internal) Returns the API key, or throws an error if no key is set yet.
 */

TB.getKey = function () {
  if (TB._key) return TB._key;
  throw new Error("Ticketbase: No API key. use TB.setKey() first");
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
  var key;

  // Resolve to an error
  try {
    key = TB.getKey();
  } catch (e) {
    return Promise.reject(e);
  }

  var options = {
    qs: { api_key: key },
    json: data
  };

  var url = TB.base + path;

  return TB._request(method, url, options)
  .then(function (res) {
    // then-request uses `0` for this for some reason
    if (res.statusCode === 0) {
      var err = new Error(
        "Ticketbase: CORS error: "+
        "this site is not allowed to access the Ticketbase API.");
      throw err;
    }

    // Only allow OK responses, throw 401's et al
    if (!/^2../.test(res.status)) {
      var err = new Error("Ticketbase: " + res.headers.status);
      err.body = parse(res.body, res.headers['content-type']);
      err.statusCode = res.statusCode;
      err.headers = res.headers;
      throw err;
    }

    function parse (body, type) {
      if (type === 'application/json') {
        return JSON.parse(body.toString());
      } else {
        return body.toString();
      }
    }

    // Return result
    return res.getBody();
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
