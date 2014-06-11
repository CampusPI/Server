var configAuth = require('./auth');

module.exports = function(server) {

  server.auth.strategy('passport', 'passport');

  var Passport = server.plugins.travelogue.passport;
  var GoogleStrategy = require('passport-google').Strategy;
  
  Passport.use(new GoogleStrategy(configAuth.travelogue.google, function (identifier, profile, done) {
    return done(null, profile);
  }));

  Passport.serializeUser(function(user, done) {
    done(null, user);
  });

  Passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

};
