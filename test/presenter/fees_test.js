require('../setup');
require('./setup');

var extend = require('deep-extend');
var original = require('../fixtures/event_ok.json');
var data, event;

describe('presenter fees', function () {

  describe('ticket (with no fees)', function () {
    beforeEach(function () {
      event = clone(original);
      event.ticket_types[0].prices.fee = 0;
      data = presentEvent(event, 'ticket');
    });

    it('sets has_fees to false', function () {
      expect(data.tickets[0].has_fees).be.false;
    });
  });

  describe('ticket (with fees)', function () {
    beforeEach(function () {
      event = clone(original);
      event.ticket_types[0].prices.fee = 0.99;
      data = presentEvent(event, 'ticket');
    });

    it('sets has_fees to true', function () {
      expect(data.tickets[0].has_fees).be.true;
    });
  });

  describe('donation (with no fees)', function () {
    beforeEach(function () {
      event = clone(original);
      event.donation_types[0].prices.fee = 0;
      data = presentEvent(event, 'donation');
    });

    it('sets has_fees to false', function () {
      expect(data.donations[0].has_fees).be.false;
    });
  });

  describe('donation (with fees)', function () {
    beforeEach(function () {
      event = clone(original);
      event.donation_types[0].prices.fee = 0.99;
      data = presentEvent(event, 'donation');
    });

    it('sets has_fees to true', function () {
      expect(data.donations[0].has_fees).be.true;
    });
  });
});

function clone (obj) {
  return require('deep-extend')({}, obj);
}
