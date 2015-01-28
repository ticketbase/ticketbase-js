var ajaxapi = require('ajaxapi');

var template = require('./helpers/template');
var getData = require('./helpers/get_data');
var extend = require('./helpers/extend');

var removeClass = require('dom101/add-class');
var addClass = require('dom101/add-class');
var ready = require('dom101/ready');
var each = require('dom101/each');
var qa = require('dom101/query-selector-all');
var q = require('dom101/query-selector');

var TB = module.exports = {};

/*
 * API
 */

TB.api = ajaxapi('http://api.ticketbase.com');

/*
 * processes all widgets
 */

TB.go = function () {
  each(qa('[data-tb]'), function (el) {
    TB.widget(el);
  });
};

/*
 * process one widget
 */

TB.widget = function (el) {
  // skip if already widgetized
  if (el.__tbInstance) return;

  var data = getData(el);
  new EventOrderWidget(el, data);
};

/*
 * i'm a widget
 */

function EventOrderWidget (el, data) {
  el.__tbInstance = this;
  extend(this, data, { el: el });
  this.el = el;
  this.load();
}

EventOrderWidget.prototype = {
  load: function () {
    var self = this;

    this.el.innerHTML = 'loading...';
    addClass(this.el, 'tb-loading');

    TB.api.get('/v1/events/'+this.eventId)
      .then(function (event) {
        self.event = event;
        self.render();
      }, function (err) {
        self.onerror();
      });
  },

  render: function () {
    removeClass(this.el, 'tb-loading');
    var tpl = template("<h1><%= event.title %></h1>");
    this.el.innerHTML = tpl({ event: this.event });
  },

  onerror: function (err) {
    throw err;
  }
};

/*
 * get all widgets
 */

ready(function () {
  TB.go();
});
