import removeClass from 'dom101/remove-class';
import addClass from 'dom101/add-class';
import sExtend from 'simpler-extend';
import extend from 'dom101/extend';
import TB from '..';

export default class BaseWidget {
  /*
   * constructor
   */

  constructor (el, data) {
    return this.ctor(el, data);
  }

  /*
   * actual constructor. defined here so that it can be called easily
   * by subclasses.
   *
   * `data` is from `data-*` attributes.
   */

  ctor (el, data) {
    el.__tbInstance = this;
    extend(this, data, { el: el });

    // defaults for all widget types
    this.setDefaults({
      poweredBy: true
    });

    // set defaults
    this.setDefaults(this.defaults());

    this.el = el;
  }

  setDefaults(defs) {
    if (!defs) return;
    for (var key in defs) {
      if (defs.hasOwnProperty(key) &&
        (typeof this[key] === 'undefined')) {
          this[key] = defs[key];
        }
    }
  }

  /*
   * defaults to be set on object creation
   */

  defaults() {
  }

  /*
   * helper to show the loading spinner
   */

  setLoadState (state) {
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
  }

  /*
   * returns an element
   */

  find (query) {
    return this.el.querySelector(query);
  }

  /*
   * Variables to pass onto the templates
   */

  baseTemplateData(err) {
    return {
      tb: (this.prefix || 'tb'),
      widget: this,
      assets: 'http://cdn.ticketbase.com/widgets/v0.1/assets',
      site_url: TB.getSiteURL(),
      error: err
    };
  }
}

BaseWidget.extend = sExtend;
