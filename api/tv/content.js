var getContent = function (request, reply){
  var db = request.server.plugins['hapi-mongodb'].db;

  db.collection('contents').find().toArray(function(err, results){
    reply(results);
  });
};

module.exports.handler = getContent;

// IMPORT TO DB
// {"type": "Transportes", "title": "Fertagus", "destination": "Roma-Areeiro", "schedule": "15:10"}
// {"type": "Transportes", "title": "Fertagus", "destination": "Roma-Areeiro", "schedule": "15:30"}
// {"type": "Transportes", "title": "Fertagus", "destination": "Setúbal", "schedule": "16:00"}
// {"type": "Transportes", "title": "Fertagus", "destination": "Coina", "schedule": "16:20"}

// {"type": "Ementa", "title": "Teresa Gato", "food": "Sopa", "plate": "Legumes"}
// {"type": "Ementa", "title": "Teresa Gato", "food": "Peixe", "plate": "Maruca Assada"}
// {"type": "Ementa", "title": "Teresa Gato", "food": "Carne", "plate": "Bitoque"}
