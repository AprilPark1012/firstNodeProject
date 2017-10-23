var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
	console.log('init express...');
	var app = express();

	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	app.use(express.static('./public'));

	require('../app/routes/news.server.routes')(app);

	app.use(function(req, res, next){
		res.status(404);

		try{
			return res.json('Resource Not Found');			
		} catch(e) {
			console.err('404 set header after sent');
		}

	});

	app.use(function(err, req, res, next){
		if(!err) { return next()}
		res.status(500);

		try{
			return(res.json(err.message || 'server err'));
		} catch(e) {
			console.err('500 set header after sent');
		}
	});

	return app;
}