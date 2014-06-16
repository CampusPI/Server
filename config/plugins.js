var config = require('./db');

var options = {
    subscribers: {
      'console': ['ops', 'request', 'log', 'error']
    }
  };

module.exports = function(server, next) {

  server.pack.register([
    {
      plugin: require('./plugins/mongo'),
      options: config,
    },
    {
      plugin: require('good'),
      options: options,
    }
  ],function (err) {
    if (err) {
      console.error(err);
      throw err;
    }
    else {
      next();
    }
  });
};
