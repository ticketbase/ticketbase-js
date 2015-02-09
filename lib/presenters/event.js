
/* event presenter */

function presentEvent (event) {
  event.order_action_url = 'https://www.ticketbase.com/orders/remote';
  event.tickets = presentTicketTypes(event.ticket_types, event);
  event.form_hidden = getHiddenFields(event);

  event.is_closed = event.status !== 'live';
  event.is_live = event.status === 'live';
  return event;
}

module.exports = presentEvent;

function getHiddenFields (event) {
  var re = [];
  var types = event.ticket_types;

  re.push("<input type='hidden' name='event_id' value='"+event.id+"'>");

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
    ticket.has_description = !! ticket.description;
    ticket.input_quantity_name = 'order[order_items_attributes]['+i+'][quantity]';

    re.push(ticket);
  }

  return re;
}
