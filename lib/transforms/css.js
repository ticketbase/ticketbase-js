import stylus from 'stylus';
import nib from 'nib';

/*
 * stylus preprocessor, to be consumed by brstar.
 */

export default function parse(css) {
  var output;

  // Yes it looks async, but it operates synchronously.
  // The test css_preprocessor_test.js will catch this in case stylus's
  // behavior changes.
  stylus(css)
    .set('filename', 'style.css')
    .set('compress', true)
    .use(nib)
    .render((err, css) => {
      if (err) throw err;
      output = css;
    });

  return output;
}
