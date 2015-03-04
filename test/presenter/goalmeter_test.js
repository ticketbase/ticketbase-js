require('../setup');
require('./setup');

var extend = require('deep-extend');
var original = require('../fixtures/event_ok.json');
var data, event;

describe('presenter goalmeter', function () {

  describe('with goal', function () {
    beforeEach(function () {
      event = extend({}, original, {
        campaign_goal: 800,
        campaign_goal_raised: 100
      });
      data = presentEvent(event, 'donation');
    });

    it('has has_goal', function () {
      expect(data.has_goal).be.true;
    });

    it('has campaign_goal_percent', function () {
      expect(data.campaign_goal_percent).eql(0.125);
    });
  });

  describe('without goal', function () {
    beforeEach(function () {
      event = extend({}, original, {
        campaign_goal: undefined,
        campaign_goal_raised: undefined
      });
      data = presentEvent(event, 'donation');
    });

    it('has no has_goal', function () {
      expect(data.has_goal).be.falsy;
    });

    it('has no campaign_goal_percent', function () {
      expect(data.campaign_goal_percent).be.undefined;
    });
  });

  describe('when goal is surpassed', function () {
    beforeEach(function () {
      event = extend({}, original, {
        campaign_goal: 800,
        campaign_goal_raised: 2000
      });
      data = presentEvent(event, 'donation');
    });

    it('has has_goal', function () {
      expect(data.has_goal).be.true;
    });

    it('has campaign_goal_percent', function () {
      expect(data.campaign_goal_percent).eql(1.0);
    });
  });
});

