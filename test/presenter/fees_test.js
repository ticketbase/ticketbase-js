/* global describe, it, beforeEach, expect, presentEvent */
/* jshint expr: true */

require('../setup');
require('./setup');

var original = require('../fixtures/event_ok.json');
var data, event;

describe('presenter fees', () => {
  describe('ticket (with no fees)', () => {
    beforeEach(() => {
      event = clone(original);
      event.ticket_types[0].prices.fee = 0;
      data = presentEvent(event, 'ticket');
    });

    it('sets has_fees to false', () => {
      expect(data.tickets[0].has_fees).be.false;
    });
  });

  describe('ticket (with fees)', () => {
    beforeEach(() => {
      event = clone(original);
      event.ticket_types[0].prices.fee = 0.99;
      data = presentEvent(event, 'ticket');
    });

    it('sets has_fees to true', () => {
      expect(data.tickets[0].has_fees).be.true;
    });
  });

  describe('donation (with no fees)', () => {
    beforeEach(() => {
      event = clone(original);
      event.donation_types[0].prices.fee = 0;
      data = presentEvent(event, 'donation');
    });

    it('sets has_fees to false', () => {
      expect(data.donations[0].has_fees).be.false;
    });
  });

  describe('donation (with fees)', () => {
    beforeEach(() => {
      event = clone(original);
      event.donation_types[0].prices.fee = 0.99;
      data = presentEvent(event, 'donation');
    });

    it('sets has_fees to true', () => {
      expect(data.donations[0].has_fees).be.true;
    });
  });
});

function clone (obj) {
  return require('deep-extend')({}, obj);
}
