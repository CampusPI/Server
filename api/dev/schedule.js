var setSchedule = function (request, reply){
  var db = request.server.plugins.mongodb.db;
  var schedule = db.collection('schedule');

  schedule.remove({}, function(){
    request.payload.forEach(function(entry){
      schedule.insert(entry, function() {});
    });
  });

  reply({
    error: null,
    success: true
  });
};

module.exports.handler = setSchedule;
