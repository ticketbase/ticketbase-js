function injectCss (data, id) {
  if (document.getElementById(id)) return;

  var styl = document.createElement('style');
  styl.id = id;
  styl.innerHTML = data;
  document.getElementsByTagName('head')[0].appendChild(styl);
}

module.exports = injectCss;
