/**
 * extend() : extend(dest, src1, [src2 ...])
 * Extends object `dest` with properties from sources `src`.
 *
 *     var extend = require('dom101/extend');
 *     extend({}, defaults, options);
 */

function extend (out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }
}

module.exports = extend;
