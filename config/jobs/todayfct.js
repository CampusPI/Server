/*
 * Every 30 minutes update information about today @ FCT
 */

module.exports = function(db,schedule) {

  var d = new Date();
  var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var m = month[d.getMonth()];
      d = d.getDate();
      // y = d.getFullYear();

  var mimelib = require('mimelib');
  var fs = require('fs');

  var todayFCT = db.collection('todayFCT');

  var Imap = require('imap');
  //var inspect = require('util').inspect;
  var config = require('../imap');

  var imap = new Imap(config);

  function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
  }

  schedule.scheduleJob('*/1 * * * *', function(){
    imap.once('ready', function() {
      openInbox(function(err) {
        if (err) { throw err; }
        imap.search([ 'UNSEEN', ['SINCE', m+' '+d+', 2014'] ], function(err, results) {
          if (err) { throw err; }
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
                  }
                });
              });
            });
          });
          f.once('end', function() {
            imap.end();
          });
        });
      });
    });
  });

  imap.connect();

  function parse(name) {

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

    require('fs').readFileSync(name).toString().split(/\r?\n/).forEach(function(line){
      if (line.indexOf('______') !== -1) { check = true;
        /*for (var i = 0; i <= buffc; i++) {
          console.log(buff[i]);
          todayFCT.insert(buff[i]);
        };*/
      }
      if (line.indexOf('* '+sitios[count]) !== -1) { check = false; }
      if (!check && line !== '') {
        if (skip) { skip = false; }
        else if (line.indexOf(sitios[count]) !== -1) {
          buffc++;
          buff[buffc] = {
            'name': line.split('*').join('').trim(),
            'Sopa': null,
            'Prato(s) do dia': null,
            'Sobremesas': null
          };

          count ++;
          skip = true;
          return true;
        }
        else {
          if (line.indexOf('- *') !== -1) {
            for (var i = 0; i < tipos.length; i++) {
              if (line.indexOf(tipos[i]) !== -1) {
                a = tipos[i];
                buff[buffc][a] = line.trim().split('- *'+a+':*').join('').replace(/ *\([^)]*\) */g, '');
                if (i !== tipos.length-1) {keep = true;}
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
    });
  }

};
