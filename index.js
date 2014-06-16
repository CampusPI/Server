var Hapi = require('hapi');
var port = process.env.PORT || 8080;
var server = new Hapi.Server(port, { cors: true });
var routes = require('./config/routes');

// Jobs for updating the database with external API's
require('./config/plugins')(server, function() {
  console.log('[Plugins] everything´s ready!');
  require('./config/jobs')(server);
});

if (!module.parent) {
  server.start(function() {
    console.log('Server started', server.info.uri);
  });
}

// Insert the routes on the server
server.route(routes);

module.exports = server;
