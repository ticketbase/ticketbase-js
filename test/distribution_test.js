require('./setup');

describe('Distribution versions: TB', function () {
  var TB;

  before(function () {
    TB = require('../ticketbase.js');
  });

  it('is exported via UMD', function () {
    expect(TB).be.an('object');
    expect(TB.go).be.a('function');
  });

  it('has the correct config()', function () {
    var config = TB.config();

    expect(config.site_name).eql("Ticketbase");
    expect(config.url).match(/www.ticketbase.com/);
    expect(config.powered_by_img).match(/powered-by.png/);
  });
});

describe('Distribution versions: TB', function () {
  var TB;

  before(function () {
    TB = require('../petlanthropy.js');
  });

  it('is exported via UMD', function () {
    expect(TB).be.an('object');
    expect(TB.go).be.a('function');
  });

  it('has the correct config()', function () {
    var config = TB.config();

    expect(config.site_name).eql("Petlanthropy");
    expect(config.url).match(/pet.ticketbase.com/);
    expect(config.powered_by_img).match(/powered-by-pet.png/);
  });
});
