import TB from '..';

/*
 * event presenter: decorates the `event` object with more fields.
 *
 *     presentEvent(event, 'ticket') // or 'donation'
 *     event.tickets
 *     event.donations
 *     event.form_hidden
 *     event.is_closed
 *     event.is_live
 */

export default function presentEvent (event, type) {
  var root = TB.getSiteURL();
  event.order_action_url = root + '/orders/remote';

  if (type === 'ticket' && event.ticket_types) {
    event.tickets = presentTicketTypes(event.ticket_types, event, 'ticket');
    event.form_hidden = getHiddenFields(event, type);
  }

  if (type === 'donation' && event.donation_types) {
    event.donations = presentTicketTypes(event.donation_types, event, 'donation');
    event.form_hidden = getHiddenFields(event, type);
    addGoal(event);
  }

  event.is_closed = event.status !== 'live';
  event.is_live = event.status === 'live';
  return event;
}

/*
 * returns HTML with <input type=hidden> tags
 */

function getHiddenFields (event, type) {
  var re = [];
  re.push("<input type='hidden' name='event_id' value='"+event.id+"'>");

  var fields = 0;
  var i, len;

  var types = event.ticket_types;
  if (type === 'ticket' && types) {
    for (i = 0, len = types.length; i < len; i++) {
      var ticket = types[i];
      if (ticket.status !== 'live') continue;

      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][item_id]' value='"+ticket.id+"'>");
      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][item_type]' value='TicketType'>");
      fields++;
    }
  }

  types = event.donation_types;
  if (type === 'donation' && types) {
    for (i = 0, len = types.length; i < len; i++) {
      var donation = types[i];
      if (donation.status !== 'live') continue;

      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][item_id]' value='"+donation.id+"'>");
      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][item_type]' value='DonationType'>");
      re.push("<input type='hidden' name='order[order_items_attributes]["+fields+"][quantity]' value='0'>");
      fields++;
    }
  }

  return re.join("\n");
}

/*
 * ticket types
 */

function presentTicketTypes (types, event, type) {
  var re = [];

  var onlyHasOne = types.length === 1;

  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];

    // update ticket info
    if (type === 'ticket') {
      ticket.is_paid = ticket.ticket_type === 'paid';
      ticket.is_free = ticket.ticket_type === 'free';
      ticket.input_quantity_name = 'order[order_items_attributes]['+i+'][quantity]';
      ticket.quantity_options_html =
        quantityOptions({
          min: ticket.min_purchase || 1,
          max: ticket.max_purchase || 10,
          selected: onlyHasOne ? ticket.min_purchase || 1 : null
        });
    }

    // update donation info
    else if (type === 'donation') {
      ticket.is_fixed = ticket.donation_type === 'fixed';
      ticket.is_open = ticket.donation_type === 'open';
      ticket.input_amount_name = 'order[order_items_attributes]['+i+'][amount]';
    }

    // update fee information
    ticket.has_fees = ticket.prices && ticket.prices.fee > 0;
    if (event.fee_payer && event.fee_payer === 'owner')
      ticket.has_fees = false;

    // hide dead tickets
    if (ticket.status !== 'live') continue;

    re.push(ticket);
  }

  return re;
}

/*
 * adds campaign goal variables
 */

function addGoal (event) {
  if (event.campaign_goal && event.campaign_goal > 0) {
    var perc = event.campaign_goal_raised / event.campaign_goal;
    event.has_goal = true;
    event.campaign_goal_percent = Math.max(0, Math.min(1, perc));
  }
}

/*
 * generates quantity <option> tags
 *
 *     quantityOptions(1, 10, { selected: 2 });
 */

function quantityOptions ({min, max, selected}) {
  let html = [];
  html.push(makeOption(0));

  for (var i = min; i <= max; i++) {
    if (i !== 0) html.push(makeOption(i));
  }

  return html.join("");

  function makeOption (i) {
    if (selected === i)
      return '<option value="' + i + '" selected>' + i + '</option>';
    else
      return '<option value="' + i + '">' + i + '</option>';
  }

}
