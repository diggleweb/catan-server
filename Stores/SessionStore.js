"use strict";

const _ = require('lodash');
const Store = require('./Store');
const SessionHandler = require('../Engine/SessionHandler');
class SessionStore extends Store {
	createNewSessionHandler(socket) {
		let handler = new SessionHandler({ socket : socket });
		socket.on('disconnect', this.onDisconnect.bind(this, handler._id));
		this.add(handler);
		console.log('User session started.');
	}

	onDisconnect(id) {
		this.remove(id);
		console.log('User session ended.');
	}
}

module.exports = SessionStore;