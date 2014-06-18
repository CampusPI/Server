/*
 * Every 12 hours update broadcast information
 * http://mail.google.com/mail/u/1?account_id=jpg.pereira@campus.fct.unl.pt&message_id=146136dc1899b306&view=conv&extsrc=atom
 * http://hagreve.com/api/v2/strikes
 */

var get = require('superagent').get;

module.exports = function(db,schedule) {

  var broadcast = db.collection('broadcast');

  var getBroadcast = function() {
    get('http://hagreve.com/api/v2/strikes', function(res){
      if (res.statusCode === 200){
        broadcast.insert(res.body, function(err) {
          if (!err) {
            console.log('[Job] Broadcast');
          }
        });
      }
    });
  };

  schedule.scheduleJob('* */12 * * *', getBroadcast);
};
