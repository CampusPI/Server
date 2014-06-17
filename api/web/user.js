var getUser = function (request, reply){
  reply(request.auth.credentials);
};

module.exports.handler = getUser;
module.exports.auth = 'bearer';
