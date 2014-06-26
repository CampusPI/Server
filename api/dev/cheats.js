var setSchedule = function (request, reply){
  var db = request.server.plugins.mongodb.db;
  
  var res = [];
//p0eLp-9RFK4

  db.collection('videos').find({videoId: 'p0eLp-9RFK4'}).toArray(function(err, results){
    res[0] = results[0];


  db.collection('schedule').find({titulo: 'Lançamento Livro'}).toArray(function(err, results){
    res[1] = results[0];


  db.collection('schedule').find({titulo: 'Cineclube | Imitation of Life'}).toArray(function(err, results){
    res[2] = results[0];

  db.collection('schedule').find({titulo: 'Ciclo Master of Glass Art and Science'}).toArray(function(err, results){
    res[3] = results[0];

  reply(res);

  });



  });

  });


  });




};

module.exports.handler = setSchedule;
