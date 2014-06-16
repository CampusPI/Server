var config = require('../../config/config').travelogue;

var getLogin = function (request, reply) {
  if (request.session._isAuthenticated()) {
    reply().redirect('/api/web/user');
  }
  else {
    var form = '<form action="/api/web/login" method="post"> <div> <label>Username:</label> <input type="text" name="username"/> </div> <div> <label>Password:</label> <input type="password" name="password"/> </div> <div> <input type="submit" value="Log In"/> </div> </form>';
    reply(form);
  }
}

var postLogin = function (request, reply){
  var Passport = request.server.plugins.travelogue.passport;
  Passport.authenticate('local', {
    successRedirect: config.urls.successRedirect,
    failureRedirect: config.urls.failureRedirect,
    failureFlash: true
  })(request, reply);

};

var logout = function (request, reply){

  request.session._logout();
  //Reply com sucesso ou falhanço!
  reply().redirect('/');

};

module.exports.getLogin = {handler:getLogin};
module.exports.postLogin = {handler:postLogin};
module.exports.logout = {handler:logout};
