module.exports = function mockWidget(options) {
  var reply = options.reply;
  var html = options.html;

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
