module.exports = {
  'url': process.env.MONGO_URL ||'mongodb://localhost:27017/test',
  'options': {
    'db': {
      'native_parser': false
    }
  }
};
