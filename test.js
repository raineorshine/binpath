'use strict';
var assert = require('insist');
var binpath = require('./index.js');

it('should return browserify\'s correct local npm binary path', function () {
	assert.strictEqual(binpath('browserify').replace(__dirname + '/', ''), 'node_modules/browserify/bin/cmd.js');
});
