import removeClass from 'dom101/remove-class';
import addClass from 'dom101/add-class';
import sExtend from 'simpler-extend';
import extend from 'dom101/extend';

export default class BaseWidget {
  /*
   * constructor
   */

  constructor (el, data) {
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
}

BaseWidget.extend = sExtend;
