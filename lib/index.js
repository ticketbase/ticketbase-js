var ajaxapi = require('ajaxapi');
var template = require('templayed');
var fs = require('fs');

var getData = require('./helpers/get_data');

var removeClass = require('dom101/remove-class');
var addClass = require('dom101/add-class');
var extend = require('dom101/extend');
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
 * I'm a widget
 */

function EventOrderWidget (el, data) {
  el.__tbInstance = this;
  extend(this, data, { el: el });
  this.el = el;
  this.load();
}

EventOrderWidget.prototype = {
  template:
    fs.readFileSync('lib/templates/event-form.html', 'utf-8'),

  load: function () {
    var self = this;

    this.el.innerHTML = 'loading...';
    addClass(this.el, 'tb-loading');

    TB.api.get('/v1/events/'+this.eventId)
      .then(function (event) {
        self.event = event;
        self.render();
        console.log(event);
      })
      .done();
  },

  render: function () {
    removeClass(this.el, 'tb-loading');
    addClass(this.el, 'tb-loaded');

    var tpl = template(this.template);
    var event = presentEvent(this.event);
    this.el.innerHTML = tpl({ event: event });
  },

  onerror: function (err) {
    throw err;
  }
};

/* event presenter */

function presentEvent (event) {
  event.ticket_types = presentTicketTypes(event.ticket_types, event);
  event.order_action_url = event.url + '/orders';
  event.form_hidden = getHiddenFields(event);
  return event;
}

function getHiddenFields (event) {
  var re = [];
  var types = event.ticket_types;
  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];

    // hide dead tickets
    if (ticket.status !== 'live') continue;

    re.push("<input type='hidden' name='order[order_items_attributes]["+i+"][item_id]' value='"+ticket.id+"'>");
    re.push("<input type='hidden' name='order[order_items_attributes]["+i+"][item_type]' value='TicketType'>");
  }
  return re.join("\n");
}

function presentTicketTypes (types, event) {
  var re = [];

  var curr = getCurrency(event.currency || 'usd');

  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];

    // hide dead tickets
    if (ticket.status !== 'live') continue;

    ticket.price_label = formatPrice(ticket.price, curr);
    ticket.input_quantity_name = 'order[order_items_attributes]['+i+'][quantity]';

    re.push(ticket);
  }

  return re;
}

function formatPrice (price, curr) {
  var priceStr = parseFloat(price, 10).toFixed(2);

  if (priceStr.match(/00$/))
    priceStr = parseFloat(price, 10).toFixed(0);

  return '' +
    curr.symbol +
    priceStr;
}

function getCurrency (code) {
  var currencies = {
    usd: { symbol: '$' },
    aud: { symbol: 'AU$' },
    btc: { symbol: 'B' }
  };

  var curr = currencies[code.toLowerCase()];
  if (!curr) throw new Error("Unknown currency '"+code+"'");
  return curr;
}
/*
 * get all widgets
 */

ready(function () {
  TB.go();
});
