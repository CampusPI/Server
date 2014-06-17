/*if (require('fs').existsSync('./config/google.js')) {
  var google = require('./google');
}*/

module.exports = function(server) {

  var validateFunc = function (token, callback) {
    //Confirmar se o token é válido
    //Confirmar outra vez se o token é válido
    //Será que o token é mesmo válido?
    //É isso que temos de confirmar.
    //Parece que é valido.
    //Encontrar o user que corresponde ao ID do token
    //Enviar user + token
    callback(null,{token:token});
  };

  server.auth.strategy('bearer', 'bearer', { validateFunc: validateFunc });
};
