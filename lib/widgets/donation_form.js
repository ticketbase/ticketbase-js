/* eslint no-alert: 0, no-unused-vars: 0 */

import presentEvent from '../presenters/event';
import TicketForm from './ticket_form';

import closest from 'dom101/closest';
import each from 'dom101/each';
import on from 'dom101/on';

export default class DonationForm extends TicketForm {
  bindEvents () {
    each(this.$radios(), (radio) => {
      on(radio, 'change', this.updateQuantities.bind(this));
      on(radio, 'focus', () => {
        var $input = closest(this, 'label').querySelector('.tb-input');
        if ($input) $input.focus();
      });
    });

    this.el.querySelector('form').onsubmit = (e) => {
      if (!this.validate()) {
        e.preventDefault();
        return false;
      }
    };
  }

  /*
   * defaults to be set on object creation
   */

  defaults () {
    return {
      headline: true,
      goalmeter: true
    };
  }

  /*
   * validate
   */

  validate () {
    var selected = getRadioValue(this.$radios());

    if (!selected) {
      window.alert('Please select one.');
      return false;
    }

    each(this.el.querySelectorAll('[name$="[amount]"]'), (input) => {
      // ensure quantities are filled out
      if (!input.value || input.value === '') {
        input.value = '0';
      }

      // ensure numeric
      if (!input.value.match(/^\s*-?\d+(\.\d+)?\s*$/)) {
        input.focus();
        window.alert('Please enter a number.');
        return false;
      }
    });

    return true;
  }

  /*
   * Variables to pass onto the templates
   */

  templateData (err) {
    var data = this.baseTemplateData(err);
    data.event = err ? {} : presentEvent(this.event, 'donation');
    return data;
  }

  /*
   * Radio buttons
   */

  $radios () {
    return this.el.querySelectorAll('[type="radio"]');
  }

  /*
   * Update the `quantity` hidden fields based on the selected radio button.
   */

  updateQuantities () {
    var radios = this.$radios();
    for (var i = 0, len = radios.length; i < len; i++) {
      var radio = radios[i];
      var key = `order[order_items_attributes][${i}][quantity]`;
      var hidden = this.el.querySelector(`[type="hidden"][name="${key}"]`);
      if (hidden) {
        hidden.setAttribute('value', radio.checked ? '1' : '0');
      }
    }
  }
}

DonationForm.prototype.template =
  require('fs').readFileSync('lib/templates/donation-form.html', 'utf-8');

function getRadioValue (radios) {
  for (var i = 0, len = radios.length; i < len; i++) {
    var radio = radios[i];
    if (radio.checked) return radios[i].value;
  }
}
