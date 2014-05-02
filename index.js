var Hapi = require("hapi");
var server = new Hapi.Server(8080, "localhost");

if (!module.parent) {
  server.start(function() {
    console.log("Server started", server.info.uri);
  });
}

server.route({
  path: "/",
  method: "GET",
  handler: function(request, reply) {
    reply({"response": "ok"});
  }
});

module.exports = server;