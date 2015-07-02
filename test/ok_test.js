/* global describe, it, mockWidget, expect, widget, $w, $ */
require('./setup');

describe('TB (ok):', () => {

  mockWidget({
    html:
      "<div id='w' data-tb='ticket-form' " +
      "data-headline='true' data-event='101'></div>",
    reply: require('./fixtures/event_ok.json')
  });

  it('print', () => {
    if (process.env.print) {
      console.log('[body]', $('body').html());
    }
  });

  it('works', () => {
    expect($w).to.have.class('tb-loaded');
  });

  describe('options', () => {
    it('saves the data\'s eventId', () => {
      expect(widget.eventId).eql(101);
    });

    it('saves the data\'s headline option', () => {
      expect(widget.headline).eql(true);
    });

    it('defaults poweredBy to true', () => {
      expect(widget.poweredBy).eql(true);
    });
  });

  describe('header', () => {
    it('has event name', () => {
      expect($w.find('h1 a')).to.contain('Ticket & Base');
    });

    it('escapes', () => {
      expect($w.find('h1 a').html()).to.contain('Ticket &amp; Base');
    });
  });

  describe('tickets', () => {
    it('has ticket types', () => {
      expect($w).to.contain('VIP');
      expect($w).to.contain('General attendee');
    });

    it('hides tickets that are sold out', () => {
      expect($w).not.to.contain('Sold out ticket');
    });
  });

  describe('other artifacts', () => {
    it('has a powered by logo', () => {
      expect($w.find('.tb-powered-by')).have.length(1);
    });

    it('loads logo from cdn', () => {
      var img = $w.find('.tb-powered-by img');
      expect(img.attr('src')).match(/cdn\.ticketbase\.com/);
    });

    it('has an alt attribute', () => {
      var img = $w.find('.tb-powered-by img');
      expect(img).have.attr('alt');
    });
  });
});
