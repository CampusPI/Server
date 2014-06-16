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
        failureRedirect: '/api/web/login',
        successRedirect: '/'
    }
  }
};
