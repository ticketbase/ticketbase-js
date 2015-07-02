/* global describe, it */
var semistandard = require('mocha-standard/semistandard');

describe('coding style', function () {
  it('conforms to semistandard', semistandard.files([
    'index.js', 'lib/**/*.js', 'test/**/*.js'
  ]));
});
