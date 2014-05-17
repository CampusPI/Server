var config = require('./db');

module.exports = function(server) {

  server.pack.require('hapi-mongodb', config, function(err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });

};
