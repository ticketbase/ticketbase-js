/*
 * getData() : getData(el)
 * Returns data attributes.
 *
 *     // <div data-name='john' data-last-name='watson'>
 *
 *     getData(div)
 *     => { name: "john", lastName: "watson" }
 */

function getData (el, prefix) {
  var key;
  var re = {};
  if (!prefix) prefix = 'data-';

  for (var i = 0, len = el.attributes.length; i < len; i++) {
    var attr = el.attributes[i];
    key = attr.name;
    if (key.substr(0, prefix.length) !== prefix) continue;

    key = key.substr(prefix.length);
    key = camelize(key);
    re[key] = attr.value;
  }

  return re;
}

function camelize (str) {
  return str.replace(/[\s_\-]+([a-zA-Z])/g, function (_, l) {
    return l.toUpperCase();
  });
}

module.exports = getData;
