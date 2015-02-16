
/* event presenter */

function presentEvent (event) {
  event.order_action_url = 'https://www.ticketbase.com/orders/remote';
  if (event.ticket_types)
    event.tickets = presentTicketTypes(event.ticket_types, event, 'ticket');

  if (event.donation_types)
    event.donations = presentTicketTypes(event.donation_types, event, 'donation');

  event.form_hidden = getHiddenFields(event);

  event.is_closed = event.status !== 'live';
  event.is_live = event.status === 'live';
  return event;
}

module.exports = presentEvent;

function getHiddenFields (event) {
  var re = [];
  re.push("<input type='hidden' name='event_id' value='"+event.id+"'>");

  var fields = 0;
  var i, len;

  var types = event.ticket_types;
  if (types) {
    for (i = 0, len = types.length; i < len; i++) {
      var ticket = types[i];
      if (ticket.status !== 'live') continue;

      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][item_id]' value='"+ticket.id+"'>");
      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][item_type]' value='TicketType'>");
      fields++;
    }
  }

  types = event.donation_types;
  if (types) {
    for (i = 0, len = types.length; i < len; i++) {
      var donation = types[i];
      if (donation.status !== 'live') continue;

      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][item_id]' value='"+donation.id+"'>");
      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][item_type]' value='DonationType'>");
      fields++;
    }
  }

  return re.join("\n");
}

function presentTicketTypes (types, event, type) {
  var re = [];

  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];

    // hide dead tickets
    if (type === 'ticket') {
      ticket.is_paid = ticket.ticket_type === 'paid';
      ticket.is_free = ticket.ticket_type === 'free';
      ticket.input_quantity_name = 'order[order_items_attributes]['+i+'][quantity]';
    }

    else if (type === 'donation') {
      ticket.is_fixed = ticket.donation_type === 'fixed';
      ticket.is_open = ticket.donation_type === 'open';
      ticket.input_amount_name = 'order[order_items_attributes]['+i+'][amount]';
    }

    if (ticket.status !== 'live') continue;
    ticket.has_description = !! ticket.description;

    re.push(ticket);
  }

  return re;
}
