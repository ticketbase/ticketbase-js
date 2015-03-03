require('./setup');

describe('css preprocessor:', function () {
  var css = require('../lib/transforms/css');

  it('works', function () {
    expect(css("div{color:#00f}")).to.eq("div{color:#00f}");
  });

  it('compresses', function () {
    expect(css("div { color: #00f; }")).to.eq("div{color:#00f}");
  });
});
