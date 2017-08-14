'use strict';
const jwt = require('jsonwebtoken');


const authenticate = secret => (token, callback) => {
	jwt.verify(token, secret, function(err, decoded){
		if(err){
			return callback(err.message);
		}
		return callback(null, decoded.userdata);
	});
};

const tokenGenerator = expiresIn => secret => userdata => {
	return jwt.sign({ userdata: userdata }, secret, { expiresIn: expiresIn });
};

module.exports = {
	authenticate : authenticate,
	tokenGenerator : tokenGenerator,
	dailyTokenGenerator : tokenGenerator('1d'),
	hourlyTokenGenerator : tokenGenerator('1h'),
	minutelyTokenGenerator : tokenGenerator('1m'),
	secondlyTokenGenerator : tokenGenerator('1s')
};