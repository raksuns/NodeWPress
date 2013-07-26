var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

// https://github.com/mmukhin/psitsmike_example_2/blob/master/app.js
exports.action = function (req, res) {

	var usernames = {};
	var rooms = ['room1', 'room2', 'room3'];

	io.sockets.on('connection', function(socket) {

		// addUser
		socket.on('adduser', function(username) {
			socket.username = username;
			socket.room = 'room1';

			usernames[username] = username;

			socket.join('room1');

			socket.emit('updatechat', 'SERVER', 'you have connected to room1');

			socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');

			socket.emit('updaterooms', rooms, 'room1');
		});

		// sendChat
		// when the client emits 'sendchat', this listens and executes
		socket.on('sendchat', function(data) {
			io.sockets.in(socket.room).emit('updatechat', socket.username, data);
		});

		// switchRoom
		socket.on('switchRoom', function(newroom) {
			socket.leave(socket.room);
			socket.join(newroom);
			socket.emit('updatechat', 'SERVER', 'you have connected to  ' + newroom);

			socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');

			socket.room = newroom;
			socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
			socket.emit('updaterooms', rooms, newroom);
		});

		// when the user disconnects...perfoms this
		socket.on('disconnect', function() {
			// remove the username from global usernames list
			delete usernames[socket.username];

			// update list of users in chat, client-side.
			io.sockets.emit('updateusers', usernames);

			// echo globally that this client has left.
			socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected.');

			socket.leave(socket.room);
		});
	});
};