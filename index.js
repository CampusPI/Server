var Hapi = require("hapi");
var server = new Hapi.Server(8080, "localhost");
var routes = require('./routes');

if (!module.parent) {
  server.start(function() {
    console.log("Server started", server.info.uri);
  });
}

server.route(routes);

module.exports = server;
