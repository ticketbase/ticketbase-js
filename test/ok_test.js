require('./setup');

describe('TB (ok):', function () {
  beforeEach(function() {
    apimock.get('/v1/events/101')
      .reply(200, require('./fixtures/event_ok.json'));
  });

  beforeEach(function () {
    $w = $("<div id='w' data-tb='event-form' data-tb-event-id='101'></div>");
    $('body').append($w);
    var widget = TB.widget($w[0]);
    return widget.promise;
  });

  it('print', function () {
    if (process.env.print)
      console.log('[body]', $('body').html());
  });

  it('works', function () {
    expect($('#w')).to.have.class('tb-loaded');
  });

  it('has event name', function () {
    expect($('#w h1 a')).to.contain('Ticket & Base');
  });

  it('escapes', function () {
    expect($('#w h1 a').html()).to.contain('Ticket &amp; Base');
  });


  it('has ticket types', function () {
    expect($('#w')).to.contain('VIP');
    expect($('#w')).to.contain('General attendee');
  });

  it('hides tickets that are sold out', function () {
    expect($('#w')).not.to.contain('Sold out ticket');
  });
});
