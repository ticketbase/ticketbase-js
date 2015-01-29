var ajaxapi = require('ajaxapi');

var getData = require('./helpers/get_data');

var ready = require('dom101/ready');
var each = require('dom101/each');
var qa = require('dom101/query-selector-all');
var q = require('dom101/query-selector');

/**
 * TB:
 * Ticketbase widget library.
 */

var TB = module.exports = {};

/**
 * api : TB.api
 * Access the Ticketbase API.
 *
 *     TB.api.get('/v1/events/101')
 *       .then(function (event) { ... })
 */

TB.api = ajaxapi('http://api.ticketbase.com');

/*
 * go : TB.go()
 * Processes all new widgets in the page.  Widgets are elements with the
 * `<div data-tb='...'>` attribute. This procedure is idempotent.
 */

TB.go = function () {
  each(qa('[data-tb]'), function (el) {
    TB.widget(el);
  });
};

/**
 * widget : TB.widget(element)
 * Converts a DOM `element` into a widget. This procedure is idempotent.
 */

TB.widget = function (el) {
  var EventForm = require('./widgets/event_form');
  console.log ("WI");

  // skip if already widgetized
  if (el.__tbInstance) return;

  var data = getData(el);
  return new EventForm(el, data);
};

/*
 * Run upon inclusion.
 */

ready(TB.go);
