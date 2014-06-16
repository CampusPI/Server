// var getUser = function (request, reply){
//   var db = request.server.plugins['hapi-mongodb'].db;

//   //params:user_id
//   db.collection('favorites').find().toArray(function(err, results){
//     reply(results);
//   });
// };

var postUser = function (request, reply){
  
  var db = request.server.plugins['hapi-mongodb'].db;

  var username = request.payload.username;
  
  var hash;
  db.collection('crypt').find().toArray(function (err, res) {
    hash = res[0].secret;
  });

  if(validate(usename)){
    //params:user_id, user_password
    db.collection('users').find({'username': username}).toArray(function(err, results){
      reply(results);
    });
  }
};

function validateEmail(email) {
  if (email.indexOf('@campus.fct.unl.pt', email.length - '@campus.fct.unl.pt'.length) !== -1) {
    return true;
  }
  else if(email.indexOf('@fct.unl.pt', email.length - '@fct.unl.pt'.length) !== -1) {
    return true;
  }
  return false;
}

// module.exports.get = {handler:getUser};
module.exports.post = {handler:postUser};
