var Lab = require('lab'),
nock = require('nock'),
server = require('../../../');

Lab.experiment ('/api/tv/weather', function () {

  nock('http://api.wunderground.com').persist().get('/api/8375472c04b107a7/conditions/q/Portugal/Almada.json').reply(200,{
    current_observation: {
      temp_c: 20.2,
      icon: 'partlycloudy'
    }
  });

  var options = {
    method: 'GET',
    url: '/api/tv/weather'
  };

  Lab.test('should exist', function(done) {
    server.inject(options, function(response) {
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

});
