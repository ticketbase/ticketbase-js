/* global describe, it, mockWidget, beforeEach, expect, $w, $w */

require('../setup');
var $item;

describe('Donation fees:', () => {

  var mock = mockWidget.bind(this, {
    html:
      "<div id='w' data-event='101' " +
      "data-tb='donation-form'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  describe('fixed, with fees:', () => {
    mock(function (event) {
      event.donation_types = [
        { id: 3,
          title: 'Donate here',
          description: 'Donation description',
          status: 'live',
          prices: {
            amount: 25,
            fee: 0.99,
            amount_with_fees: 25.99,
            formatted_amount: '$25',
            formatted_fee: '$0.99',
            formatted_amount_with_fees: '$25.99'
          },
          donation_type: 'fixed'
        }
      ];
    });

    beforeEach(() => {
      $item = $w.find('.tb-donation').eq(0);
    });

    it('has title', () => {
      expect($item.find('.tb-title').text().trim()).eql('Donate here');
    });

    it('has description', () => {
      expect($item.find('.tb-donation-description').text().trim())
        .eql('Donation description');
    });

    it('has amount', () => {
      expect($item.find('.tb-amount').text().trim()).eql('$25');
    });

    it('has fees', () => {
      expect($item.find('.tb-fees').text().trim()).eql('+ $0.99 fees');
    });
  });

  describe('fixed, with fees as 0:', () => {
    mock(function (event) {
      event.donation_types = [
        { id: 3,
          title: 'Donate here',
          description: 'Donation description',
          status: 'live',
          prices: {
            amount: 25,
            fee: 0,
            amount_with_fees: 25,
            formatted_amount: '$25',
            formatted_fee: '$0',
            formatted_amount_with_fees: '$25'
          },
          donation_type: 'fixed'
        }
      ];
    });

    beforeEach(() => {
      $item = $w.find('.tb-donation').eq(0);
    });

    it('has fees hidden', () => {
      expect($item.find('.tb-fees')).have.length(0);
    });
  });

  describe('fixed, with fee_payee as owner:', () => {
    mock(function (event) {
      event.fee_payer = 'owner';
      event.donation_types[0].prices.fee = 0.99;
    });

    beforeEach(() => {
      $item = $w.find('.tb-donation').eq(0);
    });

    it('has fees hidden', () => {
      expect($item.find('.tb-fees')).have.length(0);
    });
  });

  describe('fixed, with fee_payee as someone_else:', () => {
    mock(function (event) {
      event.fee_payer = 'someone_else';
      event.donation_types[0].prices.fee = 0.99;
    });

    beforeEach(() => {
      $item = $w.find('.tb-donation').eq(0);
    });

    it('shows fees', () => {
      expect($item.find('.tb-fees')).have.length(1);
    });
  });
});
