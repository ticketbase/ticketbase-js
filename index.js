/*
 * Ticketbase client
 * @license MIT
 */

var TB = {};

/*
 * Promise polyfill
 */

var Promise =
TB.Promise = this.Promise || require('promise-polyfill');

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
