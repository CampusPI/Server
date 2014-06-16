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
        successRedirect: '/api/web/user'
    }
  },
  good: {
    subscribers: {
      'console': ['ops', 'request', 'log', 'error']
    }
  },
  'hapi-mongodb': {
    'url': process.env.MONGO_URL ||'mongodb://localhost:27017/test',
    'options': {
      'db': {
        'native_parser': false
      }
    }
  }
};
