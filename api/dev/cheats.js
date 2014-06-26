var setSchedule = function (request, reply){
  var db = request.server.plugins.mongodb.db;
  
  var res = [];

  db.collection('videos').find({videoId: 'p0eLp-9RFK4'}).toArray(function(err, results){
    results[0].type = 'video';
    res[0] = results[0];

  db.collection('schedule').find({titulo: 'Lançamento Livro'}).toArray(function(err, results){
    results[0].type = 'biblio';
    res[1] = results[0];

  db.collection('schedule').find({titulo: 'Cineclube | Imitation of Life'}).toArray(function(err, results){
    results[0].type = 'biblio';
    res[2] = results[0];

  db.collection('schedule').find({titulo: 'Ciclo Master of Glass Art and Science'}).toArray(function(err, results){
    results[0].type = 'biblio';
    res[3] = results[0];

  reply(res);

  });

  });

  });

  });

};

module.exports.handler = setSchedule;
