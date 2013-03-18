var poolModule = require('generic-pool');
var pool = poolModule.Pool({
	name: 'mysql',
	create: function(callback) {
		var Client = require('mysql').Client;
		
		var c = new Client();
		c.user = mysql_user;
		c.password = mysql_pass;
		c.database = database;
		c.host = host;
		c.port = port;
		
		callback(null, c);
	},
	
	destroy: function(client) {
		client.end();
	},
	
	max: 10,
	min: 2,
	idleTimeoutMillis: 30000,
	log: true
});

pool.acquire(function(err, client) {
	client.query('select * from label', [], function(error, _rows, _cols) {
		pool.release(client);
		if(error) {
			console.log('ERROR : ' + error);
			return;
		}
		
		for(var i = 0; i < _rows.length, ++i) {
			console.log('Data : ' + _rows[i].name);
		}
	});
});
