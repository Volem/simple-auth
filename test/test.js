'use strict';
const SimpleAuth = require('../index.js');

let assert = require('assert');

describe('AuthManager', function () {
	describe('constructor', function () {
		it('should set secret', function () {
			let authMan = new SimpleAuth.AuthManager('secret');
			assert.equal(authMan.Secret, 'secret');
		});
		it('should throw error : secret should be defined.', function () {
			assert.throws(() => {
				new SimpleAuth.AuthManager();
			}, 'secret should be defined.');
		});
	});

	let authMan = new SimpleAuth.AuthManager('secret');
	let token;
	describe('GenerateToken', function () {
		it('should return token', function () {
			token = authMan.GenerateToken('volem');
			assert.ok(token);
		});
		it('should throw error : userdata is required', function () {
			assert.throws(() => {
				authMan.GenerateToken();
			}, 'userdata is required');
		});
	});

	describe('Authenticate', function () {
		it('should validate token and return userdata in callback', function (done) {
			authMan.Authenticate(token, function (err, userdata) {
				assert.ifError(err);
				assert.ok(userdata);
				assert.equal(userdata, 'volem');
				done();
			});
		});
		it('should return error in callback', function (done) {
			authMan.Authenticate(token + 'invalid', function (err, userdata) {
				assert.ok(err);
				done(userdata);
			});
		});
	});
});