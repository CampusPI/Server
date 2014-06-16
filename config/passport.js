// var google = require('./google');
var bcrypt = require('bcrypt');

module.exports = function(server) {

  var db = server.plugins['hapi-mongodb'].db;

  db.collection('crypt').count(function (err, count) {
    if(count === 0){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("B4c0/\/", salt, function(err, hash) {
          db.collection('crypt').insert({'secret': hash}, function (err, res) {
            if(err) console.log(err);
          });
        });
      });
    }
  });

  server.auth.strategy('passport', 'passport');

  var Passport = server.plugins.travelogue.passport;
  var LocalStrategy = require('passport-local').Strategy;

  Passport.use(new LocalStrategy(function (username, password, done) {
    var hash;
    db.collection('crypt').find().toArray(function (err, res) {
      hash = res[0].secret;
    });

    if(validateEmail(username)){
      db.collection('users').find({'username': username}).toArray(function(err, res) {
        if (res !== []) {
          bcrypt.compare(password, hash, function(err, doesMatch){
            if (doesMatch) {
              return done(null, res);
            } 
            else {
              console.log("MERDA NA PASS!");
              return done(null, false, { 'message': 'invalid password' });
            }
          });
        }
        else {
          console.log("MERDA NO USER!");
          done(null, false, { 'message': 'invalid username' });
        }  
      });
    }
    else {
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

  Passport.serializeUser(function(user, done) {
    done(null, user);
  });

  Passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

};
