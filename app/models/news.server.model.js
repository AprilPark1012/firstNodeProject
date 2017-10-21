var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
	title: String,
	content: String,
	author: String,
	createTime: {type: Date, default: Date.now}
});

var News = mongoose.model('News', NewsSchema);

module.exports = News;


