/*
 * Every 30 minutes update information about today @ FCT
 */

var mimelib = require('mimelib');
var fs = require('fs');
var Imap = require('imap');
var config = {};

if (require('fs').existsSync('./config/imap.js')) {
  config = require('../imap');
}
else {
  config.user = process.env.IMAPUSER;
  config.password = process.env.IMAPPASSWORD;
  config.host = 'imap.gmail.com';
  config.port= 993;
  config.tls = true;
}

module.exports = function(db,schedule) {

  var food = db.collection('food');

  var todayDate = new Date();
  var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var m = month[todayDate.getMonth()];
  var d = todayDate.getDate();
  var y = '2014';
  var today = m+' '+d+', '+y;

  var getEmail = function (date) {
    var imap = new Imap(config);

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function() {
      openInbox(function(err) {
        if (err) { console.log(err); }
        imap.search([ 'UNSEEN', ['SINCE', date] ], function(err, results) {
          if (err) { console.log(err); }
          if(typeof results !== 'undefined' && results !== null && results.length > 0) {
            var f = imap.fetch(results, { bodies: '' });
            f.on('message', function(msg, seqno) {
              msg.on('body', function(stream) {
                var buffer = '';
                stream.on('data', function(chunk) {
                  buffer += chunk.toString('utf8');
                });
                stream.once('end', function() {
                  var name = 'test-'+seqno+'.txt';
                  fs.writeFile(name, mimelib.decodeQuotedPrintable(buffer), function(err) {
                    if(err) {
                      console.log(err);
                    }
                    else {
                      parse(name);
                      console.log('[Job] Email');
                    }
                  });
                });
              });
            });
          }
        });
      });
    });

    imap.connect();

  };

  schedule.scheduleJob('* */4 * * *', getEmail(today));

  function parse(name,cb) {
    var check = true,
        skip = false,
        keep = true,
        count = 0;

    var sitios = [
      'Casa do Pessoal',
      'Restaurante c@mpus.come',
      'Bar c@mpus',
      'Girassol',
      'Teresa Gato',
      'Espaço Mais',
      'Snack-bar',
      'My Spot Bar'
    ];

    var tipos = [
      'Sopa',
      'Prato(s) do dia',
      'Sobremesas'
    ];

    var buff = [];
    var buffc = -1;
    var a;

    require('fs').readFileSync(name).toString().split(/\r?\n/).every(function(line){
      if (line.indexOf('______') !== -1 && !check) {
        check = true;
        food.remove({}, function() {
          for (var i = 0; i < count; i++) {
            var menu = buff[i];
            fix(menu);
            food.insert({
              ementa : menu,
              date : todayDate
            },function(){});
          }
          return false;
        });
      }
      if (line.indexOf('* '+sitios[count]) !== -1) { check = false; }
      if (!check && line !== '') {
        if (skip) { skip = false; }
        else if (line.indexOf(sitios[count]) !== -1) {
          buffc++;
          buff[buffc] = {
            'Nome': line.split('*').join('').trim(),
            'Sopa': [],
            'Prato(s) do dia': [],
            'Sobremesas': []
          };

          count ++;
          skip = true;
          return true;
        }
        else {
          if (line.indexOf('- *') !== -1) {
            for (var j = 0; j < tipos.length; j++) {
              if (line.indexOf(tipos[j]) !== -1) {
                a = tipos[j];
                buff[buffc][a] = line.trim().split('- *'+a+':*').join('').replace(/ *\([^)]*\) */g, '');
                if (j !== tipos.length-1) {keep = true;}
              }
              else {
                continue;
              }
            }
          }
          else {
            if (keep) {
              keep = false;
              buff[buffc][a] += ' '+line.trim().replace(/ *\([^)]*\) */g, '');
            }
          }
        }
      }
      return true;
    });

    var fix = function(menu) {
      for (var k in menu){
        if (menu.hasOwnProperty(k)) {
          if (typeof menu[k] === 'string') {
            menu[k] = menu[k].replace('- *Pratodo dia: *','');
            menu[k] = menu[k].replace(/ *\([^)]*\) */g, '');
            menu[k] = menu[k].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            if (k !=='Nome') {
              menu[k] = menu[k].split(', ');
            }
          }
        }
      }
    };
  }

};
