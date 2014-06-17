/*
 * Every 30 minutes update weather information
 */

var req = require ('request');

module.exports = function(db,schedule) {

  var weather = db.collection('weather');

  var getWeather = function() {
    req('http://api.wunderground.com/api/8375472c04b107a7/conditions/q/Portugal/Almada.json', function(error, response, body){
      if (!error && response.statusCode === 200){
        body = JSON.parse(body);
        weather.remove({ '_id' : { $exists : true } }, function() {
          weather.insert({
            temp: parseInt(body.current_observation.temp_c,10),
            state: body.current_observation.icon
          }, function(err) {
            if (!err) {
              console.log('[Job] Weather');
            }
          });
        });
      }
    });
  };

  getWeather();

  schedule.scheduleJob('*/30 * * * *', getWeather);
};
