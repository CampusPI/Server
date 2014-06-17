var getUser = function (request, reply){
  reply(request.auth);
};

module.exports.handler = getUser;
