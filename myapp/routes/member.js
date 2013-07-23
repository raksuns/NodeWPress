var DBPool = require('../dbpool/DBPool');

exports.list = function (req, res) {

	console.log(req.session);

	DBPool.acquire(function (err, db) {
		if (err) {
			return res.end("CONNECTION error: " + err);
		}

		db.query("select * from tbl_users", [], function (err, rows, columns) {
			DBPool.release(db);

			if (err) {
				return res.end("QUERY ERROR: " + err);
			}
			res.end(JSON.stringify(rows));
		});
	});
};