import q from 'dom101/query-selector';

/*
 * Helper: get meta tag
 */

export default function getMeta (name) {
  var meta =
    q('meta[property="' + name + '"]') ||
    q('meta[name="' + name + '"]');
  if (meta) return meta.getAttribute('content');
}
