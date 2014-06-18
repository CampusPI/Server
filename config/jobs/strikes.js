/*
 * Every 12 hours update strikes information
 * http://hagreve.com/api/v2/strikes
 */

var get = require('superagent').get;

module.exports = function(db,schedule) {

  var strikes = db.collection('strikes');

  var getStrikes = function() {
    get('http://hagreve.com/api/v2/strikes', function(res){
      if (res.statusCode === 200){
        var body = res.body;
        var data = '';
        strikes.remove({}, function (err) {
          if(!err){
            for (var i = 0; i <= body.length - 1; i++) {
              data = body[i].company.name+', desde '+body[i].start_date+' até '+body[i].end_date+' - '+body[i].description;
              strikes.insert({
                greve : data
              }, function(err) {
                if (err) {
                  console.log('Erro ao adicionar greve: '+err);
                }
              });
            };
            console.log('[Job] Strikes');
          }
        });
      };
    });
  };

  schedule.scheduleJob('* */12 * * *', getStrikes());
};
