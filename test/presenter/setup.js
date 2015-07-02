var pquire = require('proxyquire');

global.presentEvent = pquire('../../lib/presenters/event', {
  '..': {
    '@noCallThru': true,
    getSiteURL: () => 'http://ticketbase.com'
  }
});
