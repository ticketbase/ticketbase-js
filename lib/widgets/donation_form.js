var TicketForm = require('./ticket_form');
var fs = require('fs');
var TB = require('..');

var DonationForm = module.exports = TicketForm.extend({
  template:
    fs.readFileSync('lib/templates/donation-form.html', 'utf-8')
});
