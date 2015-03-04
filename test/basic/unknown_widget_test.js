require('../setup');

describe('TB (unknown widget):', function () {
  var widget, $w;

  it("throws an error", function () {
    expect(function () {
      $w = $("<div id='w' data-tb='aoeu'>");
      $('body').append($w);
      widget = TB.widget($w[0]);
    }).to.throw(/unknown widget type 'aoeu'/i);
  });

  afterEach(function (){
    $w.remove();
  });
});
