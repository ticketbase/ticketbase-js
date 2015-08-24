var semistandard = require('mocha-standard/semistandard');

describe('coding style', function () {
  this.timeout(5000);
  it('conforms to semistandard', semistandard.files([
    'index.js', 'lib/**/*.js'
  ]));

  it('tests conform to semistandard', semistandard.files([
    'test/**/*.js'
  ], {
    globals: [
      'describe', 'it', 'before', 'beforeEach', 'after', 'afterEach', 'xdescribe', 'xit',
      'expect', '$', 'apimock', 'TB', '$w', 'mockWidget', 'widget'
    ]
  }));
});
