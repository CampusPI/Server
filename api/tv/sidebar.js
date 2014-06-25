var getBroadcast = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  var obj = [];

  db.collection('food').find().toArray(function(err, results){
    var omnomnom = [];
    results.forEach(function(element) {
      for (var k in element.ementa) {
        if (element.ementa[k].length === 0) {
          delete element.ementa[k];
        }
      }
      var count = 0;
      for(k in element.ementa) {
        if(element.ementa.hasOwnProperty(k)) {
          count++;
        }
      }
      if (count !==1) {
        omnomnom.push(element);
      }
    });
    obj.push({
      name: 'Ementas',
      content: omnomnom
    });
    db.collection('transports').find().toArray(function(err, res){
      res.forEach(function(elem) {
        //console.log(elem.content);
        elem.content.forEach(function(a) {
          var point = -1;
          a.content.forEach(function loop(h,index) {
            if(loop.stop){ return; } // Já encontramos o próximo  transporte
            var now = new Date();
            var d = new Date(now.getFullYear(),now.getMonth(),now.getDate(),+h.split(':')[0],+h.split(':')[1]);
            if (now.getTime() < d.getTime()) {
              loop.stop = true;
              point = index;
            }
          });
          a.content = a.content.slice(point,point+4);
        });
      });
      obj.push({
        name: 'Transportes',
        content: res
      });
      reply(obj);
    });
  });
};

module.exports.handler = getBroadcast;
