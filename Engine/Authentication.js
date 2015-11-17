"use strict";
const _ = require("lodash");
const jwt = require('jsonwebtoken');
const ObjectId = require('bson-objectid');
const Promise = require("bluebird");
const secret = "asfkg afkgnfkjnfefafadfjjnfajnar;ljn;rlfkm'wefkmaew;fkamewf;kemf;aknfa;fna;efklas;dmfklFM;KDLFMD;KFM"
class Authentication {
	static sign(obj){
		return jwt.sign(obj, secret, {});
	}

	static authenticate(payload) {
		var token = payload.token;
		let promise = new Promise((resolve, reject) => {
			// decode token
			if (token) {

				// verifies secret and checks exp
				jwt.verify(token, secret, function (err, decoded) {
					if (err) {
						reject(err);
					} else {
						 resolve(decoded);
					}
				});

			} else {
				reject(new Error("No token provided"));
			}
		});

		return promise;

	}
}

module.exports = Authentication;