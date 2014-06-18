var config = require('./db');

var options = {
    subscribers: {
      'console': ['request', 'log', 'error']
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
    },
    {
      plugin: require('./plugins/bearer'),
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
