var login = function (request, reply){
  if (request.session._isAuthenticated()) {
    reply().redirect('/api/web/user');
  }
  else {
    var Passport = request.server.plugins.travelogue.passport;
    Passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    })(request, reply);
  }
};

var callback = function (request, reply){

  var Passport = request.server.plugins.travelogue.passport;
  Passport.authenticate('google', {
    failureFlash: true
  })(request, reply, function (err) {
    if (err && err.isBoom) {
      request.session.error = err;
      reply().redirect('/api/web/err');
    }
    delete request.session.error;
    reply().redirect('/api/web/user');
  });

};

var logout = function (request, reply){

  request.session._logout();
  //Reply com sucesso ou falhanço!
  reply().redirect('/');

};

module.exports.login = {handler:login};
module.exports.callback = {handler:callback};
module.exports.logout = {handler:logout};
