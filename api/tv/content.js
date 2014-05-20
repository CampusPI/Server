var getContent = function (request, reply){
  /*var contentList =[
    {
      type: 'Transportes',
      title: 'Fertagus',
      content: [
        ['Roma-Areeiro', '15:10'],
        ['Roma-Areeiro', '15:30'],
        ['Setubal', '16:00'],
        ['Coina', '16:20']
      ]
    }
  ];*/

    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('contents').find().toArray(function(err, results){
        reply(results);
    });
};

module.exports = getContent;