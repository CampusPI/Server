module.exports = function(server, cb) {

  var db = server.plugins.mongodb.db;

  var currentContent = db.collection('currentContent');
  var lastContent = db.collection('lastContent');
  var schedule = db.collection('schedule');

   lastContent.remove({}, function (err) {
    currentContent.remove({}, function (err) {
      schedule.remove({}, function (err) {
        cb();
      });
    });
   });

 };