var getContent = function (request, reply){
<<<<<<< HEAD

    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('contents').find().toArray(function(err, results){
        reply(results);
    });
};

module.exports = getContent;
=======
  var db = request.server.plugins['hapi-mongodb'].db;
  db.collection('content').find().toArray(function(err, items) {
    reply(items[0]);
  });
};

module.exports = getContent;

// IMPORT TO DB
// {"type": "Transportes", "title": "Fertagus", "destination": "Roma-Areeiro", "schedule": "15:10"}
// {"type": "Transportes", "title": "Fertagus", "destination": "Roma-Areeiro", "schedule": "15:30"}
// {"type": "Transportes", "title": "Fertagus", "destination": "Setúbal", "schedule": "16:00"}
// {"type": "Transportes", "title": "Fertagus", "destination": "Coina", "schedule": "16:20"}

// {"type": "Ementa", "title": "Teresa Gato", "food": "Sopa", "plate": "Legumes"}
// {"type": "Ementa", "title": "Teresa Gato", "food": "Peixe", "plate": "Maruca Assada"}
// {"type": "Ementa", "title": "Teresa Gato", "food": "Carne", "plate": "Bitoque"}
>>>>>>> 939d36342d887fb08619c960f70e8ebe9de794c2
