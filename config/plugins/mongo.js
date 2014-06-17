/*
 * Original code
 * https://github.com/Marsup/hapi-mongodb
 */

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

exports.register = function (plugin, options, next) {
  MongoClient.connect(options.url, options.settings || {}, function (err, db) {
    if (err) {
      return next(err);
    }
    plugin.expose('db', db);
    plugin.expose('lib', mongodb);
    plugin.expose('ObjectID', ObjectID);
    next();
  });
};

exports.register.attributes = {
  name: 'mongodb',
  version: '1.0.0'
};
