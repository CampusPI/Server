var req = require('request');

var getWeather = function (request, reply){
  req('http://api.wunderground.com/api/8375472c04b107a7/conditions/q/Portugal/Almada.json', function(error, response, body){
    if (!error && response.statusCode === 200){
      body = JSON.parse(body);
      reply({
        temp: parseInt(body.current_observation.temp_c,10),
        state: body.current_observation.icon
      });
    }
  });
};

module.exports = getWeather;
