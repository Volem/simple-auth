'use strict';

const sauth = require('../lib/authorizer.js');

const myAppTokenGenerator = sauth.dailyTokenGenerator('myAppSecret');

let volemToken = myAppTokenGenerator({ username: 'Volem' });

const myAppAuthorizer = sauth.authenticate('myAppSecret');

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

myAppAuthorizer(volemToken, function (err, decoded) {
	if (err) {
		return console.log(err);
	}
	console.log(decoded);
});