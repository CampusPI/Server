var getUser = function (request, reply){
  reply(request.session || {});
};

module.exports.handler = getUser;
