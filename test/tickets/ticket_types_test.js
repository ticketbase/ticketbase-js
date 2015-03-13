require('../setup');
var $item;

describe('Ticket types:', function () {

  var mock = mockWidget.bind(this, {
    html:
      "<div id='w' data-event='101' "+
      "data-tb='ticket-form'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  describe("with fees:", function () {
    mock(function (event) {
      event.ticket_types = [
        { id: 3,
          title: 'VIP ticket',
          description: 'Ticket description',
          status: 'live',
          ticket_type: 'paid',
          prices: {
            amount: 25,
            fee: 0.99,
            amount_with_fees: 25.99,
            formatted_amount: "$25",
            formatted_fee: "$0.99",
            formatted_amount_with_fees: "$25.99"
          }
        }
      ];
    });

    beforeEach(function () {
      $item = $w.find('.tb-ticket').eq(0);
    });

    it('has title', function () {
      expect($item.find('.tb-title').text().trim()).eql('VIP ticket');
    });

    it('has description', function () {
      expect($item.find('.tb-ticket-description').text().trim()).eql('Ticket description');
    });

    it('has amount', function () {
      expect($item.find('.tb-amount').text().trim()).eql('$25');
    });

    it('has fees', function () {
      expect($item.find('.tb-fees').text().trim()).eql('+ $0.99 fees');
    });

    it('has quantity', function () {
      expect($item.find('.tb-quantity select')).have.length(1);
      expect($item.find('.tb-quantity select option')).have.length.gt(5);
    });
  });
});
