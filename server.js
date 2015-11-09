"use strict";
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

class Server {
	static start(port){
		app.use(express.static('node_modules/catan-client/app'));
		io.on('connection', function (socket) {

			console.log(socket.id);

			socket.emit('ping', { message: 'ping!' });
			socket.on('ping', function (data) {
				console.log(socket.id);
				console.log(data);
			});

			socket.on('disconnect', function(){
				console.log('user disconnected');
			});
		});
		server.listen(port);
	}
}

module.exports = Server;