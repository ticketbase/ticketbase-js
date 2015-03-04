var dextend = require('deep-extend');

/*
 * Mocks a widget initialization.
 *
 *     mockWidget({
 *       reply: json data
 *       html: '<div ...>'
 *     }, [overrides])
 *
 * If you specify `overrides`, it will be extended on top of `reply`.
 *
 * Sets the following:
 *
 *  * `$w` - jQuery object of the widget <div>
 *  * `widget` - Widget instance (as returned by TB.widget())
 */

module.exports = function mockWidget(options, overrides) {
  var reply = options.reply;
  var html = options.html;

  if (overrides)
    reply = dextend({}, reply, overrides);

  beforeEach(function() {
    apimock.get('/v1/events/101').reply(200, reply);
  });

  beforeEach(function () {
    var $w = $(html);
    $('body').append($w);
    var widget = TB.widget($w[0]);

    global.$w = $w;
    global.widget = widget;

    return widget.promise;
  });

  afterEach(function (){
    global.$w.remove();
    delete global.$w;
    delete global.widget;
  });
}
