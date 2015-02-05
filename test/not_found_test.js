require('./setup');

describe('TB (not found):', function () {
  var widget, $w;

  beforeEach(function() {
    TB.quiet = true;
    apimock.get('/v1/events/102')
      .reply(404);
  });

  beforeEach(function () {
    $w = $("<div id='w' data-tb='ticket-form' data-headline='true' data-event='102'></div>");
    $('body').append($w);
    widget = TB.widget($w[0]);
    return widget.promise;
  });

  afterEach(function () {
    $w.remove();
  });

  it('has error message', function () {
    expect($w).to.contain('Sorry, tickets cannot be loaded at this time');
  });
});
