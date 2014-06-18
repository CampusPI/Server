/*
 * Every 24 hours update videos from the youtube fct channel
 */

var get = require('superagent').get;

module.exports = function(db,schedule) {

  var videos = db.collection('videos');

  var getVideos = function(){
    var tempVideos = [];
    get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PL4DE0AB48695C4E32&key=AIzaSyDH51X1r5h9VeWzOijRsGFGcaozRyeKUnU', function(res){
      if (res.statusCode === 200){
        tempVideos = res.body.items;
        console.log('[Job] Videos');
        tempVideos.forEach(function(video) {
          var videoThumbnail;
          if(video.snippet.thumbnails.maxres === undefined) {
            videoThumbnail = video.snippet.thumbnails.standard.url;
          }
          else {
            videoThumbnail = video.snippet.thumbnails.maxres.url;
          }
          var tempVideo = {
            videoId: video.snippet.resourceId.videoId,
            name: video.snippet.title,
            description: video.snippet.description,
            thumbnail: videoThumbnail
          };
          db.collection('videos').find({videoId: tempVideo.videoId}).toArray(function(err, results){
            if(results.length === 0) {
              videos.insert(tempVideo, function() {});
            }
          });
        });
      }
    });
  };

  getVideos();

  schedule.scheduleJob('* */24 * * *', getVideos);
};
