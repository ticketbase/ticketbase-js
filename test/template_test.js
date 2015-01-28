var expect = require('chai').expect;
var template, t;

describe('template', function () {
  beforeEach(function () {
    template = require('../template');
  });

  it('works', function () {
    t = template("hello");
    expect(t({})).eql("hello");
  });

  it('works without args', function () {
    t = template("hello");
    expect(t()).eql("hello");
  });

  it('works with <%= .. %>', function () {
    t = template("hello <%= 23 + 5 %>");
    expect(t()).eql("hello 28");
  });

  it('escapes with <%= .. %>', function () {
    t = template("hello <%= msg %>");
    expect(t({ msg: "<>" })).eql("hello &lt;&gt;");
  });

  it('doesnt escape with <%!= .. %>', function () {
    t = template("hello <%!= msg %>");
    expect(t({ msg: "<>" })).eql("hello <>");
  });
});
