var configDB = require('./db');
var configAuth = require('./auth');

module.exports = function(server) {

  server.pack.require('hapi-mongodb', configDB, function(err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });

  server.pack.require(configAuth, function(err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });

};
