var getVideo = function (request, reply){
  /*var videoList = [
    {
      link: 'www.youtube.com/vid1',
      title: 'Coelho1',
      hour: '15:30',
      length: '2:50',
      description: 'coelho aos saltos muito rapido'
    },
    {
      link: 'www.youtube.com/vid2',
      title: 'Coelho2',
      hour: '15:30',
      length: '2:50',
      description: 'coelho aos saltos muito rapido'
    }
  ];

  reply(videoList);*/


    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('videos').find().toArray(function(err, results){
        reply(results);
    })
};

module.exports = getVideo;
