/*
 * Every 12 hours update broadcast information
 * http://mail.google.com/mail/u/1?account_id=jpg.pereira@campus.fct.unl.pt&message_id=146136dc1899b306&view=conv&extsrc=atom
 * http://hagreve.com/api/v2/strikes
 */

var req = require ('request');

module.exports = function(db,schedule) {

  var broadcast = db.collection('broadcast');

  var getBroadcast = function() {
    req('http://hagreve.com/api/v2/strikes', function(error, response, body){
      if (!error && response.statusCode === 200){
        broadcast.insert(JSON.parse(body));
        console.log('[Job] Broadcast');
      }
    });
  };

  getBroadcast();

  schedule.scheduleJob('* */12 * * *', getBroadcast);
};
