var expect = require('chai').expect;
var TB;

before(function () {
	TB = require('../index');
});

describe('API keys', function () {
	it('throws an error before API keys', function () {
		expect(function () {
			TB.request('GET', '/');
		}).to.throw(/No API key/);
	});

	it('throws no errors with an API key', function () {
		expect(function () {
			TB.setKey('.');
			TB.getKey();
		}).not.to.throw(/No API key/);
	});
});

describe('test', function () {
	it('works', function () {
		return TB.request('GET', '/')
			.then(function (res) {
				console.log(res.getBody());
			});
	});
});
