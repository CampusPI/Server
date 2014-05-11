var dbOpts = {
  'url': 'mongodb://localhost:27017/test',
  'options': {
    'db': {
      'native_parser': false
    }
  }
};

module.exports = function(server) {

  server.pack.require('hapi-mongodb', dbOpts, function(err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });

};
