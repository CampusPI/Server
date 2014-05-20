var Lab = require('lab'),
server = require('../../../');

Lab.experiment ('/api/tv/broadcast', function () {

  var options = {
    method: 'GET',
    url: '/api/tv/broadcast'
  };

  /*Lab.test('should exist', function(done) {
    server.inject(options, function(response) {
      var result = response.result;

      Lab.expect(response.statusCode).to.equal(200);
      Lab.expect(result).to.be.instanceof(Object);

      done();
    });
  });*/

});
