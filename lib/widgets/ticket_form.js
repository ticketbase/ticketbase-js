import presentEvent from '../presenters/event';
import Base from './base';
import TB from '..';

/*
 * TicketForm:
 * For `data-tb='ticket-form'` widgets.
 */

var TicketForm;
export default TicketForm = Base.extend({
  /*
   * constructor
   */

  constructor(el, data) {
    this.ctor(el, data);

    if (!data.event)
      throw new Error("Ticketbase: no event ID found");

    this.promise = undefined;
    this.eventId = data.event;
    this.load();
  },

  defaults() {
    return {
      headline: true
    };
  },

  /*
   * loads data and renders
   */

  load() {
    var self = this;

    this.setLoadState('loading');
    this.promise = this.fetch()
      .then((event) => {
        this.event = event;
        this.render();
      })
      .catch(self.onerror.bind(this));
  },

  /*
   * Fetches via AJAX, returns a promise.
   */

  fetch() {
    return TB.api.get(`/v1/events/${this.eventId}`);
  },

  /*
   * Renders the widget URL.
   */

  render() {
    this.setLoadState('success');
    var tpl = template(this.template);
    var html = tpl(this.templateData());
    this.el.innerHTML = html;
    this.bindEvents();
  },

  /*
   * Variables to pass onto the templates
   */

  templateData(err) {
    var data = this.baseTemplateData(err);
    data.event = err ? {} : presentEvent(this.event, 'ticket');
    return data;
  },

  /*
   * binds events
   */

  bindEvents() {},

  /*
   * process an ajax error
   */

  onerror(err) {
    this.setLoadState('error');
    var tpl = template(this.template);
    var html = tpl(this.templateData(err));
    this.el.innerHTML = html;

    if (!TB.quiet)
      console.error(err);
  }
});

TicketForm.prototype.template =
  require('fs').readFileSync('lib/templates/ticket-form.html', 'utf-8');

function template (tpl) {
  return require('ministache')(tpl);
}
