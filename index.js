var Hapi = require('hapi');
var server = new Hapi.Server(8080, 'localhost', { cors: true });
var routes = require('./config/routes');

require('./config/plugins')(server);

if (!module.parent) {
  server.start(function() {
    console.log('Server started', server.info.uri);
  });
}

server.route(routes);

module.exports = server;
