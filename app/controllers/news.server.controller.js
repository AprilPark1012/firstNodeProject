var mongoose = require('mongoose');
var News = mongoose.model('News');

module.exports = {
	create: function(req, res, next){
		console.log("req.body: "+req.body);
		// var title = req.body.title;
	 //  var content = req.body.content;
	 //  var author = req.body.author;
	 //  var news = new News(title, content, author)
		var news = new News(req.body);
		news.save(function(err){
			if(err) return next(err);

			return res.json(news);
		});
	},

	list: function(req, res, next){
		var pagesize = parseInt(req.query.pagesize, 10) || 10;
		var pagestart = parseInt(req.query.pagestart, 10) || 1;

		News
		.find()
		.skip((pagestart - 1) * pagesize)
		.limit(pagesize)
		.exec(function(err, docs){
			if(err) return next(err);

			return res.json(docs);
		});

	},

	getById: function(req, res, next, id){
		if(!id) return next(new Error('News Not Found, id= ' + id));

		console.log("id: " + id);

		News
		.findOne({"_id": id})
		.exec(function(err, docs){
			if(err) return next(err);
			if(!docs) return next(new Error('News Not Found, docs=' + docs));

			req.news = docs;
			return next();
		});
	},

	get: function(req, res, next){
		return res.json(req.news);
	}
};