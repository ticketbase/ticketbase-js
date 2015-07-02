/* global describe, expect, it, beforeEach, $, $w, mockWidget */

require('../setup');
var extend = require('deep-extend');
var names;

describe('Deleted ticket:', function () {

  var mock = mockWidget.bind(this, {
    html: "<div id='w' data-event='101' data-tb='ticket-form'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  describe('ticket types', function () {
    mock(function (event) {
      var ticket = extend({}, event.ticket_types[0]);

      event.ticket_types = [
        extend({}, ticket, { title: 'VIP', status: 'live' }),
        extend({}, ticket, { title: 'General', status: 'live' }),
        extend({}, ticket, { title: 'Deleted item', status: 'deleted' })
      ];
    });

    // Get names
    beforeEach(function () {
      names = [];
      $w.find('[name]').each(function () { names.push($(this).attr('name')); });
    });

    it('has the correct ticket names', function () {
      expect($w.text()).include('VIP');
      expect($w.text()).include('General');
      expect($w.text()).not.include('Deleted item');
    });

    it('has the correct field names', function () {
      expect(names.sort()).eql([
        'event_id',
        'order[order_items_attributes][0][item_id]',
        'order[order_items_attributes][0][item_type]',
        'order[order_items_attributes][0][quantity]',
        'order[order_items_attributes][1][item_id]',
        'order[order_items_attributes][1][item_type]',
        'order[order_items_attributes][1][quantity]'
      ]);
    });
  });
});

describe('Invisible ticket:', function () {

  var mock = mockWidget.bind(this, {
    html: "<div id='w' data-event='101' data-tb='ticket-form'></div>",
    reply: require('../fixtures/event_ok.json')
  });

  describe('ticket types', function () {
    mock(function (event) {
      var ticket = extend({}, event.ticket_types[0]);

      event.ticket_types = [
        extend({}, ticket, { title: 'VIP', status: 'live' }),
        extend({}, ticket, { title: 'General', status: 'live' }),
        extend({}, ticket, { title: 'Deleted item', visibility: false })
      ];
    });

    // Get names
    beforeEach(function () {
      names = [];
      $w.find('[name]').each(function () { names.push($(this).attr('name')); });
    });

    it('has the correct ticket names', function () {
      expect($w.text()).include('VIP');
      expect($w.text()).include('General');
      expect($w.text()).not.include('Deleted item');
    });

    it('has the correct field names', function () {
      expect(names.sort()).eql([
        'event_id',
        'order[order_items_attributes][0][item_id]',
        'order[order_items_attributes][0][item_type]',
        'order[order_items_attributes][0][quantity]',
        'order[order_items_attributes][1][item_id]',
        'order[order_items_attributes][1][item_type]',
        'order[order_items_attributes][1][quantity]'
      ]);
    });
  });
});
