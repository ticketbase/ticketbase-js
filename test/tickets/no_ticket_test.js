/* global it, expect, describe, mockWidget, $w */
require('../setup');

describe('No ticket:', function () {
  var mock = mockWidget.bind(this, {
    html:
      "<div id='w' data-event='101' " +
      "data-tb='ticket-form'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  mock(function (event) {
    event.ticket_types = [];
  });

  it('works', function () {
    expect($w.text()).match(/Tickets are not available/);
  });
});
