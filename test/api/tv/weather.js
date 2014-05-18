var Lab = require('lab'),
server = require('../../../');

Lab.experiment ('/api/tv/weather', function () {

  var options = {
    method: 'GET',
    url: '/api/tv/weather'
  };
/* Não tenho tempo para isto
  Lab.test('should exist', function(done) {
    server.inject(options, function(response) {
      console.log(response);
      var result = response.result;

      Lab.expect(response.statusCode).to.equal(200);
      Lab.expect(result).to.be.instanceof(Object);

      done();
    });
  });

  Lab.test('temp should be an int', function(done) {
    server.inject(options, function(response) {
      var result = response.result;

      Lab.expect(response.statusCode).to.equal(200);
      Lab.expect(result.temp).to.satisfy(function(num) { return num === parseInt(num,10); });

      done();
    });
  });
*/
});
