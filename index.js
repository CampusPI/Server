var Hapi = require('hapi');
var server = new Hapi.Server(process.env.PORT || 5000, 'localhost', { cors: true });
var routes = require('./config/routes');

// Jobs for updating the database with external API's
require('./config/jobs');

require('./config/plugins')(server);

if (!module.parent) {
  server.start(function() {
    console.log('Server started', server.info.uri);
  });
}

server.route(routes);

module.exports = server;
