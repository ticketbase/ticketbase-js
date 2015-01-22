require('./setup');

describe('TB.request: 401', function () {
  stubAjax(401, { error: "401 Unauthorized" });

  it('performs a GET request', function () {
    TB.request('GET', '/events.json');
    expect(TB._request)
      .calledWith('GET', TB.base + '/events.json');
  });

  it('handles 401 cases', function () {
    return TB.request('GET', '/events.json')
      .then(
        errExpected,
        function (err) {
          expect(err.message).eql("Ticketbase: API failed (401)");
          expect(err.statusCode).eql(401);
          expect(err.body).eql({ error: "401 Unauthorized" });
          return true;
      });
  });
});

describe('TB.request: 200', function () {
  stubAjax(200, [
    { id: 6, title: 'Event 1' },
    { id: 7, title: 'Event 2' }
  ]);

  it('performs a GET request', function () {
    TB.request('GET', '/events.json');
    expect(TB._request)
      .calledWith('GET', TB.base + '/events.json');
  });

  it('handles 200 cases', function () {
    return TB.request('GET', '/events.json')
      .then(function (res) {
        expect(res[0].id).not.be.undefined;
        expect(res[1].id).not.be.undefined;
        return true;
      });
  });
});
