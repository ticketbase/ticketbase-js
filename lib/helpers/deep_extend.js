/**
 * deepExtend() : deepExtend(dest, src1, [src2 ...])
 * Extends object `dest` with properties from sources `src`.
 *
 *     var deepExtend = require('dom101/deepExtend');
 *     deepExtend({}, defaults, options);
 */

function deepExtend (out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
}

module.exports = deepExtend;
