module.exports = {
  yar: {
    cookieOptions: {
      password: 'campustvfctunl',
      isSecure: false
    }
  },
  travelogue: {
    hostname: 'localhost',
    port: 8080,
    urls: {
      failureRedirect: '/login',
      successRedirect: '/'
    },
    google: {
      realm: "http://localhost:8080",
      returnURL: "http://localhost:8080/api/web/auth/google/return"
    }
  }
};