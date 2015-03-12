require('babel/register');

global.expect = require('chai').expect;
global.nock = require('nock');
global.apimock = nock('http://api.ticketbase.com');
global.mockWidget = require('./helpers/mock_widget');

if (typeof global.runs === 'undefined')
  global.runs = 0;
else
  global.runs++;

require('mocha-jsdom')();

before(function setJQuery () {
  global.jQuery = $ = require('jquery');
  require('chai').use(require('chai-jquery'));
});

before(function setTB () {
  global.TB = require('../index');
});

afterEach(function () {
  apimock.done();
});
