require('../setup');
require('./setup');

var extend = require('deep-extend');
var original = require('../fixtures/event_ok.json');
var data, event;

describe('presenter goalmeter', function () {

  describe('ticket', function () {
    beforeEach(function () {
      event = extend({}, original);
      data = presentEvent(event, 'ticket');
    });

    describe('form hidden', function () {
      it('has event ID', function () {
        expect(data.form_hidden).include("input type='hidden' name='event_id' value='1'");
      });
    });
  });
});

