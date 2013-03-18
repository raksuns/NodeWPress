var express = require('express');
var app = express();

var port = 8000;

app.get('/hello.txt', function(req, res) {
	var body = 'Hello World';
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.end(body);
});

app.listen(port);
console.log('Listening on port ' + port);
