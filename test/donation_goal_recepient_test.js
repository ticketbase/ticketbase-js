require('./setup');
var mockWidget = require('./helpers/mock_widget');

describe('Donation, powered by:', function () {

  var mock = mockWidget.bind(this, {
    html:
      "<div id='w' data-event='101' "+
      "data-headline='true' "+
      "data-tb='donation-form' "+
      "data-powered-by='false'></div>",
    reply: require('./fixtures/event_ok.json')
  });

  describe("with campaign_goal_recepient:", function () {
    mock({
      campaign_goal_recepient: 'Sherlock Holmes'
    });

    it('has a campaign goal recepient text', function () {
      expect($w.find('h5.tb-subheadline'))
        .have.text('Sherlock Holmes');
    });
  });

  describe("without campaign_goal_recepient:", function () {
    mock({
      campaign_goal_recepient: undefined
    });

    it('has no campaign goal recepient text', function () {
      expect($w.find('h5.tb-subheadline'))
        .have.length(0);
    });
  });
});
