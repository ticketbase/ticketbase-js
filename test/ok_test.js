require('./setup');

describe('TB (ok):', function () {

  mockWidget({
    html:
      "<div id='w' data-tb='ticket-form' "+
      "data-headline='true' data-event='101'></div>",
    reply: require('./fixtures/event_ok.json')
  });

  it('print', function () {
    if (process.env.print)
      console.log('[body]', $('body').html());
  });

  it('works', function () {
    expect($w).to.have.class('tb-loaded');
  });

  describe('options', function () {
    it('saves the data\'s eventId', function () {
      expect(widget.eventId).eql(101);
    });

    it('saves the data\'s headline option', function () {
      expect(widget.headline).eql(true);
    });

    it('defaults poweredBy to true', function () {
      expect(widget.poweredBy).eql(true);
    });
  });

  describe('header', function () {
    it('has event name', function () {
      expect($w.find('h1 a')).to.contain('Ticket & Base');
    });

    it('escapes', function () {
      expect($w.find('h1 a').html()).to.contain('Ticket &amp; Base');
    });
  });

  describe('tickets', function () {
    it('has ticket types', function () {
      expect($w).to.contain('VIP');
      expect($w).to.contain('General attendee');
    });

    it('hides tickets that are sold out', function () {
      expect($w).not.to.contain('Sold out ticket');
    });
  });

  describe('other artifacts', function () {
    it('has a powered by logo', function () {
      expect($w.find('.tb-powered-by')).have.length(1);
    });

    it('loads logo from cdn', function () {
      var img = $w.find('.tb-powered-by img');
      expect(img.attr('src')).match(/cdn\.ticketbase\.com/);
    });

    it('has an alt attribute', function () {
      var img = $w.find('.tb-powered-by img');
      expect(img).have.attr('alt');
    });
  });
});
