'use strict';
let jwt = require('jsonwebtoken');

class AuthManager {
	constructor(secret) {
		if(!secret){
			throw new Error('secret should be defined.');
		}
		this.Secret = secret;
	}

	Authenticate(token, callback) {
		jwt.verify(token, this.Secret, function (err, decoded) {
			if (err) {
				return callback(err);
			}
			return callback(null, decoded.userdata);
		});
	}

	GenerateToken(userdata, expiresIn) {
		if (!userdata) {
			throw new Error('userdata is required');
		}
		return jwt.sign({ userdata: userdata }, this.Secret, { expiresIn: expiresIn || '1m' });
	}
}

module.exports = AuthManager;

