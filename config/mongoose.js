var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var config = require('./config');

module.exports = function(){
	var db = mongoose.connect(config.mongodb, {useMongoClient:true});

	db.on('error', console.error.bind(console, '连接错误:'));
	db.once('open', function() {
    console.log('mongo connect successfully via: ' + config.mongodb);
	})

	require('../app/models/news.server.model');

	return db;
};