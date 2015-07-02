/* global describe, it, expect, xit, before, TB, $ */
require('../setup');

describe('CSS:', function () {
  var $style;

  before(function () {
    TB.injectCss();
    $style = $('head > style');
  });

  it('injected the CSS', function () {
    expect($style).have.length(1);
  });

  xit('has .tb classnames', function () {
    expect($style.html()).to.contain('.tb-spinner');
    expect($style.html()).to.contain('.tb-price');
    expect($style.html()).to.contain('.tb-quantity');
  });
});
