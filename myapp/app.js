/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	routes = require('./routes'),
	user = require('./routes/user'),
//	member = require('./routes/member'),
	chat = require('./routes/chat'),
	chatting = require('./routes/chatting')
	;


var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(logErrors);
	app.use(clientErrorHandler);
	app.use(errorHandler);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
//app.get('/member', member.list);
app.get('/chat', chat.action);

var server = http.createServer(app);
var io = require('socket.io').listen(server, function() {
	console.log("Express server listening on port " + app.get('port'));
});

require("./routes/chatting")(io);

server.listen(3000);

function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.send(500, { error: 'Something blew up!' });
	}
	else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', { error: err });
}
