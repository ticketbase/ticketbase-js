require('../setup');
require('./setup');

var extend = require('deep-extend');
var original = require('../fixtures/event_ok.json');
var data, ticket, event;

describe('deleted tickets', function () {
  beforeEach(function () {
    event = extend({}, original);
    ticket = extend({}, event.ticket_types[0]);

    event.ticket_types = [
      extend({}, ticket, { title: "Live ticket 1", status: "live" }),
      extend({}, ticket, { title: "Deleted ticket", status: "deleted" })
    ];

    data = presentEvent(event, 'ticket');
  });

  it('only list live tickets', function () {
    expect(data.tickets).have.length(1);
    expect(data.tickets[0].title).eql("Live ticket 1");
  });
});
