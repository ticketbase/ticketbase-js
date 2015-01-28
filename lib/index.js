var template = require('./helpers/template');
var getData = require('./helpers/get_data');
var ajaxapi = require('ajaxapi');

var addClass = require('dom101/add-class');
var ready = require('dom101/ready');
var each = require('dom101/each');
var qa = require('dom101/query-selector-all');
var q = require('dom101/query-selector');

var TB = module.exports = {};

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
  this.el = el;
  this.data = data;
  el.innerHTML = 'hello' + JSON.stringify(data);
  el.__tbInstance = this;
  addClass(el, 'tb-loading');
}

/*
 * get all widgets
 */

ready(function () {
  TB.go();
});
