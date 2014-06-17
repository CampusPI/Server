if (require('fs').existsSync('./google.js')) {
  var google = require('./google');
}

module.exports = function(server) {

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'cookie_encryption_password', //TODO!
    clientId: process.env.GOOGLEID || google.clientId,
    clientSecret: process.env.GOOGLESECRET || google.clientSecret,
    isSecure: false,
    providerParams: {
      hd: 'campus.fct.unl.pt'
    }
  });

};
