/*
 * Every 12 hours update strikes information
 */

var req = require ('request');

module.exports = function(db,schedule) {

  var strikes = db.collection('strikes');

  schedule.scheduleJob('* */12 * * *', function(){
    req('http://hagreve.com/api/v2/allstrikes', function(error, response, body){
      if (!error && response.statusCode === 200){
        body = JSON.parse(body);
        for (var i = 0; i <= body.length-1; i++) {
          strikes.insert({
            priority: 1,
            type: 'Greve',
            strike_id: body[i].id,
            text: body[i].company.name+' - Início: '+body[i].start_date+' / Fim: '+body[i].end_date+' - '+body[i].description
          });
        };
      }
    });
  });
};
