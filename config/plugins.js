var config = require('./db');

module.exports = function(server) {

  server.pack.require('hapi-mongodb', config, function(err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });


  var options = {
    subscribers: {
      'console': ['ops', 'request', 'log', 'error']
    }
  };

  server.pack.require('good', options, function (err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });

};
