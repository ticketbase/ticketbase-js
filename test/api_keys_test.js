require('./setup');

describe('API keys', function () {
  var key;

  beforeEach(function () {
    key = TB._key;
  });

  afterEach(function () {
    TB.setKey(key);
  });

  it('resolves to an error before API keys', function () {
    TB.setKey(undefined);
    TB.request('GET', '/')
      .then(errExpected, function (err) {
        expect(err.match(/No API key/));
      });
  });
});
