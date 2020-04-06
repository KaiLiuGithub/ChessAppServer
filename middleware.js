'use strict';
let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = function(req, res, next) {
	let token = req.headers['x-access-token'] || req.headers['authorization'];

	if (typeof token === 'undefined') {
		return res.status(401).json({
			success: false,
			message: 'Malformed or missing JWT token'
		});
	}

	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	if (token) {
		jwt.verify(token ,config.secret, function (err, decoded) {
			if (err) {
				return res.status(403).json({
					success: false,
					message: 'Token is not valid!'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).json({
			success: false,
			message: 'Auth token is not supplied'
		});
	}
}

module.exports = {
	checkToken: checkToken
}
