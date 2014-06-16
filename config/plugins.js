var config = require('./config');

module.exports = function(server) {

  server.pack.require(config, function(err) {
    if (err) {
      console.error(err);
      throw err;
    }
    else {
      require('./passport')(server);
    }
  });

};
