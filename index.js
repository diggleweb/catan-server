"use strict";
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

io.on('connection', function (socket) {
	socket.emit('ping', { message: 'ping!' });
	socket.on('ping', function (data) {
		data = JSON.parse(data);
		console.log(data.message);
		socket.emit('ping', { message: 'ping!' })
	});
});