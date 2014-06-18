var getStuff = function (request, reply){
  //var db = request.server.plugins.mongodb.db;
  switch (request.method) {
  case 'get':
    //é um getlikes
    break;
  case 'post':
    //é um like
    break;
  default:
    //erro
    break;
  }

  console.log(request.params.id);

  reply({});
};

module.exports.handler = getStuff;
//module.exports.auth = 'bearer';
