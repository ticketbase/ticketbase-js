/* global describe, it, afterEach, expect, TB, $ */
require('../setup');

// Don't run more than once in case of --watch
if (global.runs === 0) {
  describe('Base:', function () {
    var $meta;

    it('defaults to api.ticketbase.com', function () {
      expect(TB.getBase()).to.eql('https://api.ticketbase.com');
    });

    it('can be overridden via <meta name>', function () {
      $meta = $("<meta name='ticketbase:apihost' content='http://127.0.0.2'>");
      $meta.appendTo($('head'));
      expect(TB.getBase()).to.eql('http://127.0.0.2');
      $meta.remove();
    });

    it('can be overridden via <meta property>', function () {
      $meta = $("<meta property='ticketbase:apihost' content='http://127.0.0.2'>");
      $meta.appendTo($('head'));
      expect(TB.getBase()).to.eql('http://127.0.0.2');
      $meta.remove();
    });

    afterEach(function () {
      if ($meta) $meta.remove();
    });
  });
}
