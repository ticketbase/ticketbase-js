/* eslint-disable spaced-comment */
/* global MODE */

import './polyfill/function-bind';

import getData from './helpers/get_data';
import getMeta from './helpers/get_meta';
import ajaxapi from 'ajaxapi';
import extend from 'dom101/extend';
import ready from 'dom101/ready';
import each from 'dom101/each';
import qa from 'dom101/query-selector-all';

if (typeof MODE === 'undefined' || MODE === null) {
  var defaults = {
    apihost: 'https://api.ticketbase.com',
    url: 'https://www.ticketbase.com',
    powered_by_img: 'https://cdn.ticketbase.com/widgets/v0.1/assets/powered-by.png',
    site_name: 'Ticketbase'
  };
} else if (MODE === 'pet') {
  var defaults = {
    apihost: 'https://api.pet.ticketbase.com',
    url: 'https://www.pet.ticketbase.com',
    powered_by_img: 'https://cdn.ticketbase.com/widgets/v0.1/assets/powered-by-pet.png',
    site_name: 'Petlanthropy'
  };
} else {
  throw new Error('Unknown build MODE');
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

  version: '__VERSION__',

  /**
   * getBase : TB.getBase()
   * Returns the API base URL.
   */

  getBase () {
    return getMeta('ticketbase:apihost') || defaults.apihost;
  },

  /**
   * getSiteURL : TB.getSiteURL()
   * Returns "http://www.ticketbase.com".
   */

  getSiteURL () {
    return getMeta('ticketbase:url') || defaults.url;
  },

  /**
   * config : TB.config()
   * Returns some useful internal variables.
   */

  config () {
    return extend({}, defaults, {
      apihost: this.getBase(),
      meta: this.getSiteURL()
    });
  },

  /*
   * go : TB.go()
   * Processes all new widgets in the page.  Widgets are elements with the
   * `<div data-tb='...'>` attribute. This procedure is idempotent.
   */

  go () {
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
    if (el.tbInstance) {
      return el.tbInstance;
    }

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
    var css;
    try {
      css = require('./templates/style.styl');
    } catch (e) {
      css = '/*...*/';
    }
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

setTimeout(() => {
  TB.injectCss();
  TB.go();
  ready(TB.go);
});
