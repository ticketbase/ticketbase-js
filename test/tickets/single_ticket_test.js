require('../setup');
var $select;

describe('Single ticket:', function () {

  var mock = mockWidget.bind(this, {
    html:
      "<div id='w' data-event='101' "+
      "data-tb='ticket-form'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  describe("with min:1 max:10:", function () {
    mock(function (event) {
      event.ticket_types = [ event.ticket_types[0] ];
      event.ticket_types[0].min_purchase = 1;
      event.ticket_types[0].max_purchase = 10;
    });

    beforeEach(function () {
      $select = $w.find('.tb-ticket').eq(0).find('select');
    });

    it('has quantity defaulting to 1', function () {
      expect($select.val()).eql("1");
    });
  });

  describe("with min:5 max:10:", function () {
    mock(function (event) {
      event.ticket_types = [ event.ticket_types[0] ];
      event.ticket_types[0].min_purchase = 5;
      event.ticket_types[0].max_purchase = 10;
    });

    beforeEach(function () {
      $select = $w.find('.tb-ticket').eq(0).find('select');
    });

    it('has quantity defaulting to 5', function () {
      expect($select.val()).eql("5");
    });
  });
});
