var Hapi = require('hapi');
var server = new Hapi.Server(8080, 'localhost', { cors: true });
var routes = require('./config/routes');

// Jobs for updating the database with external API's
require('./config/jobs');

require('./config/plugins')(server);
require('./config/passport')(server);

if (!module.parent) {
  server.start(function() {
    console.log('Server started', server.info.uri);
  });
}

server.route(routes);

module.exports = server;
