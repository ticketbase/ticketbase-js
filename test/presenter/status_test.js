require('../setup');
require('./setup');

var extend = require('deep-extend');
var original = require('../fixtures/event_ok.json');
var data, event;

describe('presenter status', function () {

  describe('ticket', function () {
    beforeEach(function () {
      event = extend({}, original);
      data = presentEvent(event, 'ticket');
    });

    describe('form hidden', function () {
      it('has event ID', function () {
        expect(data.form_hidden).include("input type='hidden' name='event_id' value='1'");
      });

      it('has item IDs', function () {
        expect(data.form_hidden).include("order[order_items_attributes][0][item_id]");
      });
    });
  });

  describe('ticket (closed)', function () {
    beforeEach(function () {
      event = extend({}, original);
      event.status = 'live';
      data = presentEvent(event, 'ticket');
    });

    it('sets is_closed to false', function () {
      expect(data.is_closed).be.false;
    });

    it('sets is_live to true', function () {
      expect(data.is_live).be.true;
    });
  });

  describe('ticket (open)', function () {
    beforeEach(function () {
      event = extend({}, original);
      event.status = 'closed';
      data = presentEvent(event, 'ticket');
    });

    it('sets is_live to false', function () {
      expect(data.is_live).be.false;
    });

    it('sets is_closed to true', function () {
      expect(data.is_closed).be.true;
    });
  });

});
