// var google = require('./google');
var mongojs = require('mongojs');
var db = mongojs(require('./db').url);
var bcrypt = require('bcrypt');

module.exports = function(server) {

  var users = db.collection('users');
  var crypt = db.collection('crypt');
  // var loginUsers = db.collection('loginUsers');

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("B4c0/\/", salt, function(err, hash) {
      crypt.insert(hash);
    });
  });

  server.auth.strategy('passport', 'passport');

  var Passport = server.plugins.travelogue.passport;
  // var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  var LocalStrategy = require('passport-local').Strategy;

  // Passport.use(new GoogleStrategy(google, function (accessToken, refreshToken, profile, done) {
  //   if (validateEmail(profile._json.email)) {
  //     users.update(
  //       {id: profile._json.id}, // query
  //       {$set: {user: profile}}, // replacement
  //       {upsert: true,
  //       multi: false} // options
  //     );
  //     done(null, profile);
  //   }
  //   else{
  //     done('err', null);
  //   }
  // }));

  Passport.use(new LocalStrategy(function (username, password, done) {

    // Find or create user here...
    // In production, use password hashing like bcrypt
    if(validateEmail(username)){
      users.find().toArray(function(err,res) {
        if (res !== {}) {
          console.log(res);
          // var hash = (crypt.find()).secret;
          // bcrypt.compare(password, hash, function(err, doesMatch){
            if (res.password === password) {
              return done(null, { username: username });
            } 
            else {
              console.log("MERDA NA PASS!");
              return done(null, false, { 'message': 'invalid password' });
            }
          // });
        }
        else {
          console.log("MERDA NO USER!");
          done(null, false, { 'message': 'invalid username' });
        }  
      });
    }
    else{
      console.log("MERDA NO MAIL!");
      done(null, false, { 'message': 'invalid email' });
    }
  }));

  function validateEmail(email) {
    if (email.indexOf('@campus.fct.unl.pt', email.length - '@campus.fct.unl.pt'.length) !== -1) {
      return true;
    }
    else if(email.indexOf('@fct.unl.pt', email.length - '@fct.unl.pt'.length) !== -1) {
      return true;
    }
    return false;
  }

  // Passport.serializeUser(function(user, done) {
  //   loginUsers.insert(user.id);
  //   done(null, user);
  // });

  // Passport.deserializeUser(function(obj, done) {
  //   loginUsers.remove(obj.id);
  //   done(null, obj);
  // });

};
