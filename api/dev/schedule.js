var setSchedule = function (request, reply){
    var db = request.server.plugins.mongodb.db;
    var schedule = db.collection('schedule');

    //var myList = JSON.parse(request.payload);

    schedule.remove({}, function(){
        request.payload.forEach(function(entry){
            schedule.insert(entry, function() {});
        });
    });

    //console.log(request.payload);
    reply({
        error: null,
        success: true
    });
};

module.exports.handler = setSchedule;
