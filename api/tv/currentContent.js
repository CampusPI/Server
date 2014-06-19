var setCurrentContent = function (request, reply){
  var db = request.server.plugins.mongodb.db;
  var currentContent = db.collection('currentContent');

  currentContent.remove({}, function(){
    currentContent.insert(request.payload, function() {});
  });

  reply({
    error: null,
    success: true
  });
};

module.exports.handler = setCurrentContent;