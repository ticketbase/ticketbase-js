import getData from './helpers/get_data';
import getMeta from './helpers/get_meta';
import ajaxapi from 'ajaxapi';
import ready from 'dom101/ready';
import each from 'dom101/each';
import qa from 'dom101/query-selector-all';

if (PETLANTHROPY) {
  var defaults = {
    apihost: 'http://api.pet.ticketbase.com',
    url: 'https://www.pet.ticketbase.com'
  };
} else {
  var defaults = {
    apihost: 'http://api.ticketbase.com',
    url: 'https://www.ticketbase.com'
  };
}

/***
 * TB:
 * Ticketbase widget library.
 */

var TB;
export default TB = {

  /**
   * version:
   * The widget version number.
   */

  version: "__VERSION__",

  /**
   * getBase : TB.getBase()
   * Returns the API base URL.
   */

  getBase() {
    return getMeta('ticketbase:apihost') || defaults.apihost;
  },

  /**
   * getSiteURL : TB.getSiteURL()
   * Returns "http://www.ticketbase.com".
   */

  getSiteURL() {
    return getMeta('ticketbase:url') || defaults.url;
  },

  /*
   * go : TB.go()
   * Processes all new widgets in the page.  Widgets are elements with the
   * `<div data-tb='...'>` attribute. This procedure is idempotent.
   */

  go() {
    each(qa('[data-tb]'), function (el) {
      try {
        TB.widget(el);
      } catch (e) {
        console.error(e);
      }
    });
  },

  /**
   * widget : TB.widget(element)
   * Converts a DOM `element` into a widget. This procedure is idempotent.
   */

  widget (el) {
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
  },

  /**
   * injectCss : IB.injectCss()
   * (Internal) adds Ticketbase CSS.
   */

  injectCss () {
    var css = require('fs').readFileSync('lib/templates/style.css', 'utf-8');
    require('./helpers/inject_css')(css, 'ticketbase-css');
  }
};

/*
 * API
 */

TB.api = ajaxapi(TB.getBase());

/*
 * Run upon inclusion. Also, re-run .go() on DOM ready (which may or may not
 * have already happened).
 */

TB.injectCss();
TB.go();
ready(TB.go);
