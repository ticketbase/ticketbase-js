/* global describe, it, expect, mockWidget, $w */
require('../setup');

describe('Donation, powered by:', function () {
  mockWidget({
    html:
      "<div id='w' data-event='101' " +
      "data-tb='ticket-form' data-powered-by='false'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  it('has no powered by badge', function () {
    expect($w.find('.tb-powered-by')).have.length(0);
  });
});
