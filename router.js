var mongoose = require('mongoose');

module.exports = function (modelName, pathName, autoRoute, app, middleWare) {
	var Model = mongoose.model(modelName),
		index, create, destroy, update, show, _getQuery;

	_getQuery = function (req) {
		var query = req.query.query ? JSON.parse(req.query.query) : {},
			options = {},
			fields = req.query.fields ? JSON.parse(req.query.fields) : [],
			opCheck = ['limit', 'sort', 'skip', 'lean', 'explain', 'timeout'],
			o;

		for (o in req.query) {
			if (opCheck.indexOf(o) >= 0) {
				options[o] = JSON.parse(req.query[o]);
			}
		}
		return {
			options: options,
			fields: fields,
			query: query
		}
	}

	index = function (req, res, next) {
		var query = _getQuery(req);

		Model.find(query.query, query.fields, query.options, function (err, docs) {
			if (err) {
				throw err;
			} else {
				req.docs = docs;
				if (autoRoute) {
					res.send(JSON.stringify(req.docs));
				} else {
					next();
				}
			}
		})
	}

	show = function (req, res, next) {
		Model.findOne({
			_id: req.params.id
		}, function (err, doc) {
			if (err) {
				throw err;
			} else {
				req.docs = doc;
				if (autoRoute) {
					res.send(JSON.stringify(req.docs));
				} else {
					next();
				}
			}
		})
	}

	update = function (req, res, next) {
		var key;
		Model.findOne({
			_id: req.params.id
		}, function (err, doc) {
			if (err) {
				throw err;
			} else {
				for (key in req.body) {
					if (req.body.hasOwnProperty(key)) {
						doc[key] = req.body[key];
					}
				}
				doc.save(function (err, newDoc) {
					if (err) {
						throw err;
					} else {
						req.docs = newDoc;
						if (autoRoute) {
							res.send(JSON.stringify(req.docs));
						} else {
							next();
						}
					}
				});
			}
		})
	}

	destroy = function (req, res, next) {
		Model.findOne({
			_id: req.params.id
		}, function (err, doc) {
			if (err) {
				throw err;
			} else {
				doc.remove();
				req.docs = doc;
				if (autoRoute) {
					res.send(JSON.stringify(req.docs));
				} else {
					next();
				}
			}
		})
	}

	create = function (req, res, next) {
		var key, doc = new Model(),
			schema = doc.schema.paths;

		for (key in schema) {
			if (schema.hasOwnProperty(key)) {
				if (!schema[key].options.auto) {
					if (typeof req.body[key] !== "undefined") {
						doc[key] = req.body[key];
					}
				}
			}
		}

		doc.save(function (err, newDoc) {
			if (err) {
				throw err;
			} else {
				req.docs = newDoc;
				if (autoRoute) {
					res.send(JSON.stringify(req.docs));
				} else {
					next();
				}
			}
		});
	}

	if (autoRoute && app && pathName) {
		app.get("/" + pathName, middleWare, index);
		app.get("/" + pathName + "/:id", middleWare, show);
		app.put("/" + pathName + "/:id", middleWare, update);
		app.delete("/" + pathName + "/:id", middleWare, destroy);
		app.post("/" + pathName, middleWare, create);
	}

	return {
		index: index,
		create: create,
		destroy: destroy,
		update: update,
		show: show
	}
}