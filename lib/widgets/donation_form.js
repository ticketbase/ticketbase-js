var presentEvent = require('../presenters/event');
var TicketForm = require('./ticket_form');
var fs = require('fs');
var TB = require('..');

var each = require('dom101/each');
var on = require('dom101/on');

var DonationForm = module.exports = TicketForm.extend({
  template:
    fs.readFileSync('lib/templates/donation-form.html', 'utf-8'),

  bindEvents: function () {
    var self = this;

    each(this.$radios(), function (radio) {
      on(radio, 'change', function () {
        self.updateQuantities();
      });
    });
  },

  /*
   * Variables to pass onto the templates
   */

  templateData: function (err) {
    return {
      tb: (this.prefix || 'tb'),
      widget: this,
      event: err ? {} : presentEvent(this.event, 'donation'),
      error: err
    };
  },


  /*
   * Radio buttons
   */

  $radios: function () {
    return this.el.querySelectorAll('[type="radio"]');
  },

  /*
   * Update the `quantity` hidden fields based on the selected radio button.
   */

  updateQuantities: function () {
    var radios = this.$radios();
    for (var i = 0, len = radios.length; i < len; i++) {
      var radio = radios[i];
      var key = 'order[order_items_attributes]['+i+'][quantity]';
      var hidden = this.el.querySelector('[type="hidden"][name="'+key+'"]');
      if (hidden)
        hidden.setAttribute('value', radio.checked ? '1' : '0');
    }
  }
});

function getRadioIndex (radios) {
  for (var i = 0, len = radios.length; i < len; i++) {
    var radio = radios[i];
    if (radio.checked) return i;
  }
}
