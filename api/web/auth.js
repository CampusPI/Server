var config = require('../../config/auth');

var login = function (request, reply){
  
  var html = '<a href="/api/web/auth/google">Login with Google</a>';
  if (request.session) {
    html += "<br/><br/><pre><span style='background-color: #eee'>session: " + JSON.stringify(request.session, null, 2) + "</span></pre>";
  }
  reply(html);

};

var google = function (request, reply){
  
  Passport.authenticate('google')(request, reply);

};

var callback = function (request, reply){
  
  Passport.authenticate('google', {
    failureRedirect: config.travelogue.urls.failureRedirect,
    successRedirect: config.travelogue.urls.successRedirect,
    failureFlash: true
  })(request, reply, function (err) {
    if (err && err.isBoom) {
      request.session.error = err;
    }
    reply().redirect('/');
  });

};

var logout = function (request, reply){
  
  request.session._logout();
  reply().redirect('/');

};

module.exports.login = {handler:login};
module.exports.google = {handler:google};
module.exports.callback = {handler:callback};
module.exports.logout = {handler:logout};
