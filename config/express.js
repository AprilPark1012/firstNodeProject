var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
	console.log('init express...');
	var app = express();

	require('../app/routes/news.server.routes')(app);

	app.use(bodyParser.json());

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