"use strict";
const _ = require('lodash');
const ObjectID = require("bson-objectid");
const Authentication = require('./Authentication');
const Stores = require('../Stores');
const User = require('../Objects/User');
const Game = require('../Objects/Game');
const events = require('../Data/comm.json');
const Util = require('../Util');

class SessionHandler  {

	constructor(socket, gameStore, userStore) {
		this._id = (new ObjectID()).toHexString();
		this.socket = socket;
		this.gameStore = gameStore;
		this.userStore = userStore;

		let game1 = new Game({ name: "game1", players: [
			(new ObjectID()).toHexString(),
			(new ObjectID()).toHexString(),
			(new ObjectID()).toHexString()]
		});

		let game2 = new Game({ name: "game2", players: [
			(new ObjectID()).toHexString(),
			(new ObjectID()).toHexString(),
			(new ObjectID()).toHexString()]
		});

		let game3 = new Game({ name: "game3", players: [
			(new ObjectID()).toHexString(),
			(new ObjectID()).toHexString(),
			(new ObjectID()).toHexString()]
		});

		this.gameStore.add(game1);
		this.gameStore.add(game2);
		this.gameStore.add(game3);


		this.onConnect();
	}

	onConnect() {
		this.attachListeners();
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

	onCurrentGamesInfo() {
		this.socket.emit("current-games-info", this.gameStore.getAll());
	}

	onCurrentUserNames() {
		this.socket.emit("current-user-count", _.map(this.userStore.getAll(), (game)=> game.toJSON()));
	}

	onCreateUser(payload) {
		let user = new User(payload);
		this.userStore.add(user);
		let json = user.toJSON();
		this.socket.emit("create-user", {
			user: json,
			token: Authentication.sign(json)
		});
		this.socket.broadcast.emit("current-user-count", this.userStore.size());
	}

	onLogout(payload) {
		let user = Authentication.authenticate(payload)
		.then((user)=>{
			this.userStore.remove(user._id);
			this.socket.emit("logout", { status: true });
			this.socket.broadcast.emit("current-user-count", this.userStore.size());
		})
		.catch((err)=>{
				this.socket.emit("logout", { status: false, err: err.message });
		});

	}

	onCheckUserName(name) {
		this.socket.emit("check-user-name", !!this.userStore.lookupBy({ userName: name }));
	}

	attachListeners() {
		this.socket.on("message", this.onRequest.bind(this));

		_.each(events, event=>this.socket.on(event, this[Util.hyphenToFunctionName(event)].bind(this)));
	}



}

module.exports = SessionHandler;