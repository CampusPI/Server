var getContent = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('transports').find().toArray(function(err, results){
    results.forEach(function(elem) {
      console.log(elem.type);
      for (var a in elem.content) {
        console.log(a);
        var point = -1;
        elem.content[a].forEach(function loop(h,index) {

          if(loop.stop){ return; } // Já encontramos o próximo transporte

          var now = new Date();
          var d = new Date(now.getFullYear(),now.getMonth(),now.getDate(),+h.split(':')[0],+h.split(':')[1]);

          if (now.getTime() < d.getTime()) {
            loop.stop = true;
            point = index;
          }
        });
        elem.content[a] = elem.content[a].slice(point,point+4);
      }
    });
    reply(results);
  });
};

module.exports.handler = getContent;
