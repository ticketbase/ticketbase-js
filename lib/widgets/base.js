var removeClass = require('dom101/remove-class');
var addClass = require('dom101/add-class');
var extend = require('dom101/extend');

function BaseWidget() {
  return BaseWidget.prototype.initialize.apply(this, arguments);
}

BaseWidget.prototype = {
  /*
   * constructor
   */

  constructor: function (el, data) {
    el.__tbInstance = this;
    extend(this, data, { el: el });
    this.el = el;
  },

  /*
   * template
   */

  template: null,

  /*
   * helper to show the loading spinner
   */

  setLoadState: function (state) {
    if (state === 'loading') {
      this.el.innerHTML = '<div class="tb-spinner"></div>';
      addClass(this.el, 'tb-loading');
    }
    else if (state === 'success') {
      removeClass(this.el, 'tb-loading');
      addClass(this.el, 'tb-loaded');
    }
    else if (state === 'error') {
      removeClass(this.el, 'tb-loading');
      addClass(this.el, 'tb-error');
    }
  },

  /*
   * returns an element
   */

  find: function (query) {
    return this.el.querySelector(query);
  },

};

BaseWidget.extend = require('simpler-extend');

module.exports = BaseWidget;
