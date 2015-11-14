"use strict";
const _ = require('lodash');
const ObjectID = require("bson-objectid");
const Authentication = require('./Authentication');
const Stores = require('../Stores');
const User = require('../Objects/User');
const events = require('../Data/comm.json');
const Util = require('../Util');

class SessionHandler  {

	constructor(socket, gameStore, userStore) {
		this._id = (new ObjectID()).toHexString();
		this.socket = socket;
		this.gameStore = gameStore;
		this.userStore = userStore;
		this.userStore.add(new User({ userName: 'osman' }));
		this.userStore.add(new User({ userName: 'hashim' }));
		this.onConnect();
	}

	onConnect() {
		this.attachListeners();
		this.onCurrentGameCount();
		this.onCurrentUserCount();
	}

	onRequest(request) {
		this[Util.hyphenToFunctionName(request)].call(this);
	}

	onCurrentGameCount() {
		this.socket.emit("current-game-count", this.gameStore.size());
	}

	onCurrentUserCount() {
		this.socket.emit("current-user-count", this.userStore.size());
	}

	onCurrentGameNames() {
		this.socket.emit("current-game-count", this.gameStore.getAll());
	}

	onCurrentUserNames() {
		this.socket.emit("current-user-count", this.userStore.getAll());
	}

	onCreateUser(payload) {
		let user = new User(payload);
		this.userStore.add(user);
		this.socket.emit("login", user.toJSON());
		console.log(this.userStore.getAll());
	}

	onCheckUserName(name) {
		let user = this.userStore.lookupBy({ userName: name });
		this.socket.emit("check-user-name", !!user);
	}

	attachListeners() {
		this.socket.on("message", this.onRequest.bind(this));

		_.each(events, event=>this.socket.on(event, this[Util.hyphenToFunctionName(event)].bind(this)));
	}



}

module.exports = SessionHandler;