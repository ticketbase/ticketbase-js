
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

    // hide dead tickets
    if (ticket.status !== 'live') continue;

    re.push("<input type='hidden' name='order[order_items_attributes]["+i+"][item_id]' value='"+ticket.id+"'>");
    re.push("<input type='hidden' name='order[order_items_attributes]["+i+"][item_type]' value='TicketType'>");
  }
  return re.join("\n");
}

function presentTicketTypes (types, event) {
  var re = [];

  var curr = getCurrency(event.currency || 'usd');

  for (var i = 0, len = types.length; i < len; i++) {
    var ticket = types[i];

    // hide dead tickets
    if (ticket.status !== 'live') continue;

    ticket.price_label = formatPrice(ticket.price, curr);
    ticket.input_quantity_name = 'order[order_items_attributes]['+i+'][quantity]';

    re.push(ticket);
  }

  return re;
}

function formatPrice (price, curr) {
  var priceStr = parseFloat(price, 10).toFixed(2);

  if (priceStr.match(/00$/))
    priceStr = parseFloat(price, 10).toFixed(0);

  return '' +
    curr.symbol +
    priceStr;
}

function getCurrency (code) {
  var currencies = {
    usd: { symbol: '$' },
    aud: { symbol: 'AU$' },
    btc: { symbol: 'B' }
  };

  var curr = currencies[code.toLowerCase()];
  if (!curr) throw new Error("Unknown currency '"+code+"'");
  return curr;
}
