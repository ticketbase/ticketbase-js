/* global describe, it, expect, $w, xit, mockWidget */
require('../setup');

describe('Donation goal:', function () {

  var mock = mockWidget.bind(this, {
    html:
      "<div id='w' data-event='101' " +
      "data-headline='true' " +
      "data-tb='donation-form' " +
      "data-powered-by='false'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  describe('with campaign goal:', function () {
    mock(function (event) {
      event.campaign_goal = 800;
      event.campaign_goal_raised = 100;
    });

    it('has .tb-goalmeter', function () {
      expect($w.find('.tb-goalmeter')).have.length(1);
    });

    it('has .tb-progressbar', function () {
      expect($w.find('.tb-goalmeter .tb-progressbar')).have.length(1);
    });

    it('has proper percentage', function () {
      expect($w.find('.tb-progressbar-fill').attr('style'))
        .eql('width: 12.5%');
    });

    it('has text', function () {
      expect($w.find('.tb-goalmeter-description').text())
        .match(/100\s*raised of\s*800/);
    });

    xit('.', function () {
      expect($w.html()).eql('');
    });
  });
});
