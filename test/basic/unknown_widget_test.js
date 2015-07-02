/* global describe, it, expect, $, TB, afterEach */
require('../setup');

describe('TB (unknown widget):', () => {
  var $w;

  it('throws an error', () => {
    expect(() => {
      $w = $("<div id='w' data-tb='aoeu'>");
      $('body').append($w);
      TB.widget($w[0]);
    }).to.throw(/unknown widget type 'aoeu'/i);
  });

  afterEach(() => {
    $w.remove();
  });
});
