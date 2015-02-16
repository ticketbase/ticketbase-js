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
        self.updateQuantity();
      });
    });
  },

  $radios: function () {
    return this.el.querySelectorAll('[type="radio"]');
  },

  updateQuantity: function () {
    var radios = this.$radios();
    var idx = getRadioIndex(radios);
    var key = 'order[order_items_attributes]['+idx+'][quantity]';

    var qty = this.el.querySelector('[role="quantity"]');
    if (!qty) {
      qty = document.createElement('input');
      qty.setAttribute('role', 'quantity');
      qty.setAttribute('type', 'hidden');
      this.el.querySelector('form').appendChild(qty);
    }

    qty.setAttribute('name', key);
    qty.setAttribute('value', '1');
  }
});

function getRadioIndex (radios) {
  for (var i = 0, len = radios.length; i < len; i++) {
    var radio = radios[i];
    if (radio.checked) return i;
  }
}
