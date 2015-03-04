var pquire = require('proxyquire');

global.presentEvent = pquire('../../lib/presenters/event', {
  '..': {
    '@noCallThru': true,
    getSiteURL: function () { return "http://ticketbase.com"; }
  } 
});
