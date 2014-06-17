var getVideo = function (request, reply){
  reply(request.auth);
};

module.exports.handler = getVideo;
