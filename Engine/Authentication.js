const _ = require("lodash");
const jwt = require('jsonwebtoken');
const ObjectId = require('bson-objectid');
const secret = "asfkg afkgnfkjnfefafadfjjnfajnar;ljn;rlfkm'wefkmaew;fkamewf;kemf;aknfa;fna;efklas;dmfklFM;KDLFMD;KFM"
class Authentication {
	static sign(obj){
		var token = jwt.sign(obj, secret, {});
	}

	static authenticate(payload) {
		var token = payload.token;

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, secret, function (err, decoded) {
				if (err) {
					return false;
				} else {
					return decoded;
				}
			});

		} else {
			return false;
		}
	}
}

module.exports = Authentication;