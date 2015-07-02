/*
 * getData() : getData(el)
 * Returns data attributes as a plain object.
 *
 *     // <div data-name='john' data-last-name='watson'>
 *
 *     getData(div)
 *     => { name: "john", lastName: "watson" }
 */

export default function getData (el, prefix) {
  var key;
  var re = {};
  if (!prefix) prefix = 'data-';

  for (var i = 0, len = el.attributes.length; i < len; i++) {
    var attr = el.attributes[i];
    key = attr.name;
    if (key.substr(0, prefix.length) !== prefix) continue;

    key = key.substr(prefix.length);
    key = camelize(key);
    re[key] = value(attr.value);
  }

  return re;
}

function camelize (str) {
  return str.replace(/[\s_\-]+([a-zA-Z])/g, function (_, l) {
    return l.toUpperCase();
  });
}

function value (val) {
  if ((+val).toString() === val) return +val;
  if (val === 'true') return true;
  if (val === 'false') return false;

  return val;
}
