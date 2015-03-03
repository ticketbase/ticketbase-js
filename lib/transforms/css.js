/*
 * stylus preprocessor, to be consumed by brstar.
 */

module.exports = function preprocess(css) {
  var output;

  // Yes it looks async, but it operates synchronously.
  // The test css_preprocessor_test.js will catch this in case stylus's
  // behavior changes.
  require('stylus')(css)
    .set('filename', 'style.css')
    .set('compress', true)
    .use(require('nib'))
    .render(function (err, css) {
      if (err) throw err;
      output = css;
    });

  return output;
};
