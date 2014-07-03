var get = require('superagent').get;

var upload = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  var data = request.payload;

  if(data.type === 'video'){
    get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+data.videoId+'&key=AIzaSyDH51X1r5h9VeWzOijRsGFGcaozRyeKUnU', function(res){
      if (res.statusCode === 200){
        var items = res.body.items[0];
        var videoThumbnail;
        if(items.snippet.thumbnails.maxres === undefined) {
          videoThumbnail = items.snippet.thumbnails.standard.url;
        }
        else {
          videoThumbnail = items.snippet.thumbnails.maxres.url;
        }
        var tempVideo = {
          videoId: data.videoId,
          name: items.snippet.title,
          description: items.snippet.description,
          thumbnail: videoThumbnail
        };
        db.collection('videos').find({videoId: tempVideo.videoId}).toArray(function(err, results){
          if(results.length === 0) {
            console.log('cenas');
            db.collection('videos').insert(tempVideo, function() {
              reply({message: 'Success'});
            });
          }
          else {
            reply({message: 'Repetido'});
          }
        });
      }
    });
  }
  else{
    var tempVar = {
      'titulo': data.titulo,
      'conteudo': data.conteudo,
      'link': data.link,
      'publicado': data.publicado
    };
    db.collection('news').find().toArray(function(err, results){
      var exists = false;
      for(var a = 0; a < results.length; a++){
        if(results[a].link === tempVar.link) {
          exists = true;
          reply({message: 'Repetido'});
        }
      }
      if(exists === false) {
        console.log('cenas');
        db.collection('news').insert(tempVar, function() {
          reply({message: 'Success'});
        });
      }
    });
  }
};

module.exports.post = {
  handler:upload,
  auth: 'bearer'
};
