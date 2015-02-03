var presentEvent = require('../presenters/event');
var removeClass = require('dom101/remove-class');
var addClass = require('dom101/add-class');
var template = require('templayed');
var extend = require('dom101/extend');
var fs = require('fs');
var TB = require('..');

/*
 * EventForm:
 * For `data-tb='event-form'` widgets.
 */

function EventForm (el, data) {
  el.__tbInstance = this;
  extend(this, data, { el: el });

  if (!data.event)
    throw new Error("Ticketbase: no event ID found");

  this.el = el;
  this.promise = undefined;
  this.eventId = data.event;
  this.load();
}

EventForm.prototype = {
  /*
   * template
   */

  template:
    fs.readFileSync('lib/templates/event-form.html', 'utf-8'),

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
      .catch(self.onerror.bind(this))
      .done();
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
    throw err;
  }
};

module.exports = EventForm;
