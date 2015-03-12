require('../setup');
var $item;

describe('Donation fees:', function () {

  var mock = mockWidget.bind(this, {
    html:
      "<div id='w' data-event='101' "+
      "data-tb='donation-form'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  describe("fixed, with fees:", function () {
    mock({
      donation_types: [
        { id: 3,
          title: 'Donate here',
          description: 'Donation description',
          status: 'live',
          prices: {
            amount: 25,
            fee: 0.99,
            amount_with_fees: 25.99,
            formatted_amount: "$25",
            formatted_fee: "$0.99",
            formatted_amount_with_fees: "$25.99"
          },
          donation_type: 'fixed'
        }
      ]
    });

    beforeEach(function () {
      $item = $w.find('.tb-donation').eq(0);
    });

    it('has title', function () {
      expect($item.find('.tb-title').text().trim()).eql('Donate here');
    });

    it('has description', function () {
      expect($item.find('.tb-donation-description').text().trim()).eql('Donation description');
    });

    it('has amount', function () {
      expect($item.find('.tb-amount').text().trim()).eql('$25');
    });

    it('has fees', function () {
      expect($item.find('.tb-fees').text().trim()).eql('+ $0.99 fees');
    });
  });

  describe("fixed, with fees as 0:", function () {
    mock({
      donation_types: [
        { id: 3,
          title: 'Donate here',
          description: 'Donation description',
          status: 'live',
          prices: {
            amount: 25,
            fee: 0,
            amount_with_fees: 25,
            formatted_amount: "$25",
            formatted_fee: "$0",
            formatted_amount_with_fees: "$25",
          },
          donation_type: 'fixed'
        }
      ]
    });

    beforeEach(function () {
      $item = $w.find('.tb-donation').eq(0);
    });

    it('has fees hidden', function () {
      expect($item.find('.tb-fees')).have.length(0);
    });
  });
});
