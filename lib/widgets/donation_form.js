var DonationForm = Base.extend({
  initialize: function (el, data) {
    this.load();
  },

  load: function () {
    this.setLoadState('loading');
  }
});
