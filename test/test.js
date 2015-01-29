var expect = require('chai').expect;
var nock = require('nock');
var apimock = nock('http://api.ticketbase.com');
var TB, $;

require('mocha-jsdom')();

beforeEach(function() {
  apimock
    .get('/v1/events/101')
    .reply(200, {
      title: 'My event',
      url: 'http://google.com',
      ticket_types: [
        {
          title: 'VIP',
          price: '200.0'
        },
        {
          title: 'General attendee',
          price: '0'
        }
      ]
    });
});

describe('TB', function () {
  before(function () {
    global.jQuery = $ = require('jquery');
    require('chai').use(require('chai-jquery'));
    TB = require('../index');
  });

  before(function (next) {
    $('body').append("<div id='w' data-tb='event-form' data-event-id='101'></div>");
    TB.go();

    setTimeout(next, 20);
  });

  it('works', function () {
    expect($('#w')).to.have.class('tb-loaded');
  });

  it('has event name', function () {
    expect($('#w h1 a')).to.have.text('My event');
  });

  it('has ticket types', function () {
    expect($('#w')).to.contain('VIP');
    expect($('#w')).to.contain('General attendee');
  });
});
