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
    // default to true
    if (data.poweredBy !== false) data.poweredBy = true;

    el.__tbInstance = this;
    extend(this, data, { el: el });
    this.el = el;
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
