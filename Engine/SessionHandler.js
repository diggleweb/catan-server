"use strict";

const _ = require('lodash');
const Authentication = require('Authentication');

class SessionHandler {
	constructor(socket){
		this.socket = socket;
	}
}

module.exports = SessionHandler;