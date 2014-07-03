var Hapi = require('hapi');
var port = process.env.PORT || 8080;
var server = new Hapi.Server(port, { cors: true });

// Jobs for updating the database with external API's
require('./config/plugins')(server, function() {
  console.log('[Plugins] Ready to roll');

  require('./config/jobs/cleanDB')(server, function(){
    require('./config/jobs')(server);
  });

  require('./config/auth')(server);

  server.route(require('./config/routes'));

  server.start(function() {
    console.log('Server started', server.info.uri);
  });

});

