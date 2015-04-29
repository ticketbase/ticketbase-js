require('../setup');
require('./setup');

var extend = require('deep-extend');
var original = require('../fixtures/event_ok.json');
var data, event;

describe('presenter status', () => {

  describe('ticket', () => {
    beforeEach(() => {
      event = extend({}, original);
      data = presentEvent(event, 'ticket');
    });

    describe('form hidden', () => {
      it('has event ID', () => {
        expect(data.form_hidden).include("input type='hidden' name='event_id' value='1'");
      });

      it('has item IDs', () => {
        expect(data.form_hidden).include("order[order_items_attributes][0][item_id]");
      });
    });
  });

  describe('ticket (closed)', () => {
    beforeEach(() => {
      event = extend({}, original);
      event.status = 'live';
      data = presentEvent(event, 'ticket');
    });

    it('sets is_closed to false', () => {
      expect(data.is_closed).be.false;
    });

    it('sets is_live to true', () => {
      expect(data.is_live).be.true;
    });
  });

  describe('ticket (open)', () => {
    beforeEach(() => {
      event = extend({}, original);
      event.status = 'closed';
      data = presentEvent(event, 'ticket');
    });

    it('sets is_live to false', () => {
      expect(data.is_live).be.false;
    });

    it('sets is_closed to true', () => {
      expect(data.is_closed).be.true;
    });
  });

});
