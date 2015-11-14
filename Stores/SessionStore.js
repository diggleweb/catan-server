"use strict";

const _ = require('lodash');
const Store = require('./Store');
const SessionHandler = require('../Engine/SessionHandler');
class SessionStore extends Store {
	createNewSessionHandler(socket, gameStore, userStore) {
		let handler = new SessionHandler(socket, gameStore, userStore);
		socket.on('disconnect', this.onDisconnect.bind(this, handler._id));
		this.add(handler);
		console.log(`User session ${handler._id} started.`);
	}

	onDisconnect(id) {
		this.remove(id);
		console.log(`User session ${id} ended.`);
	}

}

module.exports = SessionStore;