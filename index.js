/*
 * Ticketbase client
 * @license MIT
 */

var TB = {};

/**
 * TB.base:
 * (Internal) Base URL path.
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
 * TB.request() : request(method, url, options, callback)
 * (Internal) AJAX library. See [then-request].
 * [then-request]: https://www.npmjs.com/package/then-request
 *
 *     request('GET', '/events.json')
 *     .then(function (res) {
 *       res.statusCode == 200
 *       res.getBody()
 *     });
 */

TB.request = function (method, path, options) {
  if (!options) options = {};
  if (!options.qs) options.qs = {};
  if (!options.qs.api_key) options.qs.api_key = TB.getKey();

  var url = TB.base + path;

  return TB._request(method, url, options)
  .then(function (res) {
    // do any transforms here if necessary
    // do error checking here too if needed
    return res;
  });
};

/**
 * TB.setKey() : setKey(key)
 * Sets the API key to given `key` string.
 *
 *     TB.setKey('a0b1cd30a91adc0ffee');
 */

TB.setKey = function (key) {
  TB._key = key;
  return TB;
};

/**
 * TB.getKey : getKey()
 * Returns the API key, or throws an error if no key is set yet.
 */

TB.getKey = function () {
  if (TB._key) return TB._key;
  throw new Error("Ticketbase: No API key. use TB.setKey() first");
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
