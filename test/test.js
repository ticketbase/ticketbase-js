var expect = require('chai').expect;
var nock = require('nock');
var apimock = nock('http://api.ticketbase.com');
var TB, $;

require('mocha-jsdom')();

beforeEach(function() {
  apimock
    .get('/v1/events/101')
    .reply(200, {
      title: 'Ticket & Base',
      url: 'http://google.com',
      currency: 'usd',
      ticket_types: [
        {
          title: 'VIP',
          price: '200.0',
          ticket_type: 'paid',
          status: 'live'
        },
        {
          title: 'General attendee',
          price: '0',
          ticket_type: 'free',
          status: 'live'
        },
        {
          title: 'Sold out ticket',
          price: '0',
          ticket_type: 'free',
          status: 'dead' /* ?? */
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
    $('body').html(
      "<div id='w' data-tb='event-form' data-event-id='101'></div>");
    TB.go();

    setTimeout(next, 100);
  });

  it('print', function () {
    if (process.env.print)
      console.log('[body]', $('body').html());
  });

  it('works', function () {
    expect($('#w')).to.have.class('tb-loaded');
  });

  it('has event name', function () {
    expect($('#w h1 a')).to.contain('Ticket & Base');
  });

  it('escapes', function () {
    expect($('#w h1 a').html()).to.contain('Ticket &amp; Base');
  });


  it('has ticket types', function () {
    expect($('#w')).to.contain('VIP');
    expect($('#w')).to.contain('General attendee');
  });

  it('hides tickets that are sold out', function () {
    expect($('#w')).not.to.contain('Sold out ticket');
  });
});
