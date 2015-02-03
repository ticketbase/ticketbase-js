
/* event presenter */

function presentEvent (event) {
  event.ticket_types = presentTicketTypes(event.ticket_types, event);
  event.order_action_url = event.url + '/orders';
  event.form_hidden = getHiddenFields(event);
  return event;
}

module.exports = presentEvent;

function getHiddenFields (event) {
  var re = [];
  var types = event.ticket_types;
  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];
    if (ticket.status !== 'live') continue;

    re.push("<input type='hidden' name='order[order_items_attributes]["+i+"][item_id]' value='"+ticket.id+"'>");
    re.push("<input type='hidden' name='order[order_items_attributes]["+i+"][item_type]' value='TicketType'>");
  }
  return re.join("\n");
}

function presentTicketTypes (types, event) {
  var re = [];

  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];

    // hide dead tickets
    if (ticket.status !== 'live') continue;

    ticket.is_paid = ticket.ticket_type === 'paid';
    ticket.is_free = ticket.ticket_type === 'free';
    ticket.input_quantity_name = 'order[order_items_attributes]['+i+'][quantity]';

    re.push(ticket);
  }

  return re;
}
