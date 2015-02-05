require('./setup');

describe('Base:', function () {
  var $meta;

  it('defaults to api.ticketbase.com', function () {
    expect(TB.getBase()).to.eql('http://api.ticketbase.com');
  });

  it('can be overridden via <meta name>', function () {
    $meta = $("<meta name='ticketbase:apihost' content='http://127.0.0.1'>");
    $meta.appendTo($('head'));
    expect(TB.getBase()).to.eql('http://127.0.0.1');
  });

  it('can be overridden via <meta property>', function () {
    $meta = $("<meta property='ticketbase:apihost' content='http://127.0.0.1'>");
    $meta.appendTo($('head'));
    expect(TB.getBase()).to.eql('http://127.0.0.1');
  });

  afterEach(function () {
    if ($meta) {
      $meta.remove();
      $meta = undefined;
    }
  });
});
