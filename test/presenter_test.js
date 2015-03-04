require('./setup');
var pquire = require('proxyquire');

var presentEvent = pquire('../lib/presenters/event', {
  '..': {
    '@noCallThru': true,
    getSiteURL: function () { return "http://ticketbase.com"; }
  } 
});

var extend = require('deep-extend');
var event = require('./fixtures/event_ok.json');

describe('presenter', function () {
  var data;

  describe('ticket', function () {
    beforeEach(function () {
      data = presentEvent(extend({}, event, {
      }), 'ticket');
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

});
