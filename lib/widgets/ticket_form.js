var presentEvent = require('../presenters/event');
var removeClass = require('dom101/remove-class');
var addClass = require('dom101/add-class');
var template = require('templayed');
var extend = require('dom101/extend');
var Base = require('./base');
var fs = require('fs');
var TB = require('..');

/*
 * EventForm:
 * For `data-tb='ticket-form'` widgets.
 */

var EventForm = Base.extend({

  /*
   * constructor
   */

  initialize: function (el, data) {
    el.__tbInstance = this;
    extend(this, data, { el: el });

    if (!data.event)
      throw new Error("Ticketbase: no event ID found");

    this.el = el;
    this.promise = undefined;
    this.eventId = data.event;
    this.load();
  },

  /*
   * template
   */

  template:
    fs.readFileSync('lib/templates/ticket-form.html', 'utf-8'),

  /*
   * loads data and renders
   */

  load: function () {
    var self = this;

    this.el.innerHTML = '<div class="tb-spinner"></div>';
    addClass(this.el, 'tb-loading');

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
    removeClass(this.el, 'tb-loading');
    addClass(this.el, 'tb-loaded');

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
    removeClass(this.el, 'tb-loading');
    addClass(this.el, 'tb-error');

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

module.exports = EventForm;
