"use strict";
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const stores = require('./Stores');
var sessionStore = new stores.SessionStore();
var gameStore = new stores.GameStore();
var userStore = new stores.UserStore();

class Server {
	static start(port){
		app.use(express.static('node_modules/catan-client/app'));
		io.on('connection', function (socket) {
			sessionStore.createNewSessionHandler(socket, gameStore, userStore);
		});
		server.listen(port);
	}
}

module.exports = Server;