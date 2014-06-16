var google = require('./google');

module.exports = function(server) {

  server.auth.strategy('google', 'bell', {
    provider: 'google',
    password: 'cookie_encryption_password', //TODO!
    clientId: google.clientId,
    clientSecret: google.clientSecret,
    isSecure: false,
    providerParams: {
      hd: 'campus.fct.unl.pt'
    }
  });

};
