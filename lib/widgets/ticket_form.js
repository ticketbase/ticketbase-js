var presentEvent = require('../presenters/event');
var Base = require('./base');
var fs = require('fs');
var TB = require('..');

function template (tpl) {
  return require('ministache')(tpl);
}

/*
 * TicketForm:
 * For `data-tb='ticket-form'` widgets.
 */

var TicketForm = module.exports = Base.extend({

  /*
   * constructor
   */

  constructor: function (el, data) {
    Base.prototype.constructor.apply(this, arguments);

    if (!data.event)
      throw new Error("Ticketbase: no event ID found");

    this.promise = undefined;
    this.eventId = data.event;
    this.load();
  },

  template:
    fs.readFileSync('lib/templates/ticket-form.html', 'utf-8'),

  /*
   * loads data and renders
   */

  load: function () {
    var self = this;

    this.setLoadState('loading');
    this.promise = TB.api.get('/v1/events/'+this.eventId)
      .then(function (event) {
        self.event = event;
        self.render();
      })
      .catch(self.onerror.bind(this));
  },

  /*
   * renders
   */

  render: function () {
    this.setLoadState('success');
    var tpl = template(this.template);
    var event = presentEvent(this.event);
    this.el.innerHTML = tpl({
      tb: (this.prefix || 'tb'),
      widget: this,
      event: event
    });
  },

  /*
   * process an ajax error
   */

  onerror: function (err) {
    this.setLoadState('error');
    var tpl = template(this.template);
    this.el.innerHTML = tpl({
      tb: (this.prefix || 'tb'),
      is_error: true,
      error: err,
      widget: this,
      event: {}
    });

    if (!TB.quiet)
      console.error(err);
  }
});
