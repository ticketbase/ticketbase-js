/* global describe, it, mockWidget, expect, beforeEach, $w */

require('../setup');
var $select;

describe('Ticket quantitie:', function () {

  var mock = mockWidget.bind(this, {
    html:
      "<div id='w' data-event='101' " +
      "data-tb='ticket-form'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  describe('with min 1 max 3:', function () {
    mock(function (event) {
      event.ticket_types[0].min_purchase = 1;
      event.ticket_types[0].max_purchase = 3;
    });

    beforeEach(function () {
      $select = $w.find('.tb-ticket').eq(0).find('select');
    });

    it('generates 0 to 3', function () {
      expect($select.find('option')).have.length(4);
      expect($select.find('option[value="0"]')).have.length(1);
      expect($select.find('option[value="1"]')).have.length(1);
      expect($select.find('option[value="2"]')).have.length(1);
      expect($select.find('option[value="3"]')).have.length(1);
    });
  });

  describe('with min 5 max 7:', function () {
    mock(function (event) {
      event.ticket_types[0].min_purchase = 5;
      event.ticket_types[0].max_purchase = 7;
    });

    beforeEach(function () {
      $select = $w.find('.tb-ticket').eq(0).find('select');
    });

    it('generates 0, 5, 6, 7', function () {
      expect($select.find('option')).have.length(4);
      expect($select.find('option[value="0"]')).have.length(1);
      expect($select.find('option[value="5"]')).have.length(1);
      expect($select.find('option[value="6"]')).have.length(1);
      expect($select.find('option[value="7"]')).have.length(1);
    });
  });
});
