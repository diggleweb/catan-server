"use strict";
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const SessionStore = require('./Stores/SessionStore');
var sessionStore = new SessionStore();

class Server {
	static start(port){
		app.use(express.static('node_modules/catan-client/app'));
		io.on('connection', function (socket) {
			sessionStore.createNewSessionHandler(socket);
		});
		server.listen(port);
	}
}

module.exports = Server;