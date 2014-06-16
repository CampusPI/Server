var schedule = require('node-schedule');

module.exports = function(server) {

  var db = server.plugins.mongodb.db;

  require ('./weather')(db,schedule);
  require ('./broadcast')(db,schedule);
  require ('./news')(db,schedule);
  require ('./videos')(db,schedule);
};
