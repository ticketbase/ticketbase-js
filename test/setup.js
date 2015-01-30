global.expect = require('chai').expect;
global.nock = require('nock');
global.apimock = nock('http://api.ticketbase.com');

require('mocha-jsdom')();

before(function setJQuery () {
  global.jQuery = $ = require('jquery');
  require('chai').use(require('chai-jquery'));
});

before(function setTB () {
  global.TB = require('../index');
});

