require('./setup');

describe('TB.request: CORS errors', function () {
  stubAjax(0, {});

  it('handles CORS errors', function () {
    return TB.request('GET', '/events.json')
      .then(errExpected, function (err) {
        expect(err.message).match(/Ticketbase: CORS error/);
        return true;
      });
  });
});
