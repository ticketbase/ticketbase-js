require('./setup');

describe('TB (ok):', function () {
  var widget, $w;

  beforeEach(function() {
    apimock.get('/v1/events/101')
      .reply(200, require('./fixtures/event_ok.json'));
  });

  beforeEach(function () {
    $w = $("<div id='w' data-tb='ticket-form' data-headline='true' data-event='101'></div>");
    $('body').append($w);
    widget = TB.widget($w[0]);
    return widget.promise;
  });

  afterEach(function (){
    $w.remove();
  });

  it('print', function () {
    if (process.env.print)
      console.log('[body]', $('body').html());
  });

  it('saves the data\'s eventId', function () {
    expect(widget.eventId).eql(101);
  });

  it('saves the data\'s headline option', function () {
    expect(widget.headline).eql(true);
  });

  it('works', function () {
    expect($w).to.have.class('tb-loaded');
  });

  it('has event name', function () {
    expect($w.find('h1 a')).to.contain('Ticket & Base');
  });

  it('escapes', function () {
    expect($w.find('h1 a').html()).to.contain('Ticket &amp; Base');
  });


  it('has ticket types', function () {
    expect($w).to.contain('VIP');
    expect($w).to.contain('General attendee');
  });

  it('hides tickets that are sold out', function () {
    expect($w).not.to.contain('Sold out ticket');
  });
});
