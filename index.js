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
