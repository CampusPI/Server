var configAuth = require('./auth');
var google = require('./google');
var mongojs = require('mongojs');
var db = mongojs(require('./db').url);

module.exports.in = function(server) {

  var users = db.collection('users');
  var loginUsers = db.collection('loginUsers');

  server.auth.strategy('passport', 'passport');

  var Passport = server.plugins.travelogue.passport;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  
  Passport.use(new GoogleStrategy(google, function (accessToken, refreshToken, profile, done) {
    if (validateEmail(profile._json.email)) {
      users.update(
        {id: profile._json.id}, // query
        {$set: {user: profile}}, // replacement
        {upsert: true,
        multi: false} // options
      );
      done(null, profile);
    }
    else{
      done('err', null);
    }
  }));

  function validateEmail(email) {
    if (email.indexOf('@campus.fct.unl.pt', email.length - '@campus.fct.unl.pt'.length) !== -1) {
      return true;
    }
    return false;
  }

  Passport.serializeUser(function(user, done) {
    loginUsers.insert(user.id);
    done(null, user);
  });

  Passport.deserializeUser(function(obj, done) {
    loginUsers.remove(obj.id);
    done(null, obj);
  });

};