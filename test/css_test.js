require('./setup');

describe('CSS:', function () {
  var $style;

  before(function () {
    TB.injectCss();
    $style = $('head > style');
  });

  it('injected the CSS', function () {
    expect($style).have.length(1);
  });

  it('has .tb classnames', function () {
    expect($style.html()).to.contain('.tb-spinner');
    expect($style.html()).to.contain('.tb-title');
    expect($style.html()).to.contain('.tb-quantity');
  });
});
