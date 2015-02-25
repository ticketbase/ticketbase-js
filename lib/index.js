import getData from './helpers/get_data';
import ajaxapi from 'ajaxapi';
import ready from 'dom101/ready';
import each from 'dom101/each';
import fs from 'fs';
import qa from 'dom101/query-selector-all';
import q from 'dom101/query-selector';

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
 * getBase : TB.getBase()
 * Returns the API base URL.
 */

TB.getBase = function () {
  return getMeta('ticketbase:apihost') ||
    'http://api.ticketbase.com';
};

/**
 * getSiteURL : TB.getSiteURL()
 * Returns "http://www.ticketbase.com".
 */

TB.getSiteURL = function () {
  return getMeta('ticketbase:url') ||
    'https://www.ticketbase.com';
};

/**
 * api : TB.api
 * Access the Ticketbase API.
 *
 *     TB.api.get('/v1/events/101')
 *       .then(function (event) { ... })
 */

TB.api = ajaxapi(TB.getBase());

/*
 * go : TB.go()
 * Processes all new widgets in the page.  Widgets are elements with the
 * `<div data-tb='...'>` attribute. This procedure is idempotent.
 */

TB.go = function () {
  each(qa('[data-tb]'), function (el) {
    try {
      TB.widget(el);
    } catch (e) {
      console.error(e);
    }
  });
};

/**
 * widget : TB.widget(element)
 * Converts a DOM `element` into a widget. This procedure is idempotent.
 */

TB.widget = function (el) {

  // skip if already widgetized
  if (el.__tbInstance)
    return el.__tbInstance;

  var data = getData(el);
  switch (data.tb) {
    case 'ticket-form':
      var TicketForm = require('./widgets/ticket_form');
      return new TicketForm(el, data);

    case 'donation-form':
      var DonationForm = require('./widgets/donation_form');
      return new DonationForm(el, data);

    default:
      throw new Error("Ticketbase: unknown widget type '" + data.tb + "'");
  }
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
 * Run upon inclusion. Also, re-run .go() on DOM ready (which may or may not
 * have already happened).
 */

TB.injectCss();
TB.go();
ready(TB.go);

/*
 * Helper: get meta tag
 */

function getMeta (name) {
  var meta =
    q('meta[property="' + name + '"]') ||
    q('meta[name="' + name + '"]');
  if (meta) return meta.getAttribute('content');
}

