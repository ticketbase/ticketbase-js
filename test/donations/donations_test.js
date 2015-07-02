/* global describe, it, expect, mockWidget, beforeEach, $w, widget, $ */
require('../setup');

describe('Donations:', function () {
  mockWidget({
    html:
      "<div id='w' data-tb='donation-form' " +
      "data-headline='true' " +
      "data-event='101'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  it('works', function () {
    expect($w).to.have.class('tb-loaded');
  });

  describe('options', function () {
    it('defaults goalmeter option to true', function () {
      expect(widget.goalmeter).eql(true);
    });

    it('saves the data\'s eventId', function () {
      expect(widget.eventId).eql(101);
    });

    it('saves the data\'s headline option', function () {
      expect(widget.headline).eql(true);
    });
  });

  describe('radio buttons', function () {
    var $qtys, $radios;

    beforeEach(function () {
      $radios = $w.find('[type="radio"]');
      $qtys = $w.find('[type="hidden"][name$="quantity]"]');
    });

    it('has quantity fields', function () {
      expect($qtys).have.length(3);
    });

    it('starts with 0 quantities', function () {
      $qtys.each(function () {
        expect($(this)).have.attr('value', '0');
      });
    });

    it('has radio buttons', function () {
      expect($radios).have.length(3);
    });

    it('changes quantities', function () {
      $radios.eq(1).prop('checked', true);
      widget.updateQuantities();
      expect($qtys.eq(0)).have.attr('value', '0');
      expect($qtys.eq(1)).have.attr('value', '1');
      expect($qtys.eq(2)).have.attr('value', '0');
    });

    it('changes quantities (2)', function () {
      $radios.eq(2).prop('checked', true);
      $radios.eq(1).prop('checked', true);
      widget.updateQuantities();
      expect($qtys.eq(0)).have.attr('value', '0');
      expect($qtys.eq(1)).have.attr('value', '1');
      expect($qtys.eq(2)).have.attr('value', '0');
    });
  });

});
