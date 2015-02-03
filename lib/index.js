var getData = require('./helpers/get_data');
var ajaxapi = require('ajaxapi');
var ready = require('dom101/ready');
var each = require('dom101/each');
var fs = require('fs');
var qa = require('dom101/query-selector-all');
var q = require('dom101/query-selector');

/***
 * TB:
 * Ticketbase widget library.
 */

var TB = module.exports = {};

/**
 * version:
 * The widget version number.
 */

TB.version = "__VERSION__";

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

  // skip if already widgetized
  if (el.__tbInstance)
    return el.__tbInstance;

  var data = getData(el);
  return new EventForm(el, data);
};

/**
 * injectCss : IB.injectCss()
 * (Internal) adds Ticketbase CSS.
 */

TB.injectCss = function () {
  var css = fs.readFileSync('lib/templates/style.css', 'utf-8');
  require('./helpers/inject_css')(css, 'ticketbase-css');
};

/*
 * Run upon inclusion.
 */

ready(TB.injectCss);
ready(TB.go);
