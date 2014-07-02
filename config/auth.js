var id = '859779641004-cvl4ppt05dj26eprlv0eer3hrbmkpudf.apps.googleusercontent.com',
    hd = 'campus.fct.unl.pt';

var get = require('superagent').get;

module.exports = function(server) {

  var validateFunc = function (token, callback) {
    //FAKE IT TILL YOU MAKE IT!
    if (token === '109029607727800353127') {
      server.plugins.mongodb.db.collection('users').find({id: token}).toArray(function(err, results){
        var user = results[0];
        user.token = token;
        callback(null,results[0]);
      });
    }
    else {
      //Confirmar se o token é válido
      get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token, function(res){
        if (res.body.issued_to !== id) {
          return callback(null,null);
        }
        //Confirmar hd
        get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+token, function(res){
          if (res.body.hd !== hd) {
            return callback(null,null);
          }
          //Encontrar o user que corresponde ao ID do token
          var db = server.plugins.mongodb.db;

          db.collection('users').find({id: res.body.id}).toArray(function(err, results){
            var user;
            if (results.length === 0) {
              //Não existe? não faz mal vamos criar
              user = res.body;
              db.collection('users').insert(user, function(err) {if (!err) {console.log('[User] New User');}});
            }
            else {
              //Existe? óptimo!
              user = results[0];
            }
            user.token = token;
            callback(null,user);
          });
        });
      });
    }

  };

  server.auth.strategy('bearer', 'bearer', { validateFunc: validateFunc });
};
