/* global TB, apimock, beforeEach, describe, $, it, expect, afterEach */
require('./setup');

describe('TB (not found):', () => {
  var widget, $w;

  beforeEach(() => {
    TB.quiet = true;
    apimock.get('/v1/events/102')
      .reply(404);
  });

  beforeEach(() => {
    $w = $("<div id='w' data-tb='ticket-form' " +
      "data-headline='true' data-event='102'></div>");
    $('body').append($w);
    widget = TB.widget($w[0]);
    return widget.promise;
  });

  afterEach(() => {
    $w.remove();
  });

  it('has error message', () => {
    expect($w).to.contain('Sorry, tickets cannot be loaded at this time');
  });
});
