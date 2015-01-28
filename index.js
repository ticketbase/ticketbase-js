var template = require('./template');
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

TB.infect = function () {
  each(qa('[data-tb]'), function ($el) {
    TB.widget($el);
  });
};

TB.widget = function ($el) {
  var type = $el.getAttribute('data-tb');

  $el.innerHTML = 'helol';
  addClass($el, 'tb-loading');
};

ready(function () {
  TB.infect();
});
