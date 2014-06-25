/*
 * Every 24 hours update biblio articles
 */

var feed = require('feed-read');
var cheerio = require('cheerio');

module.exports = function(db,schedule) {

  var biblio = db.collection('biblio');

  var getBiblio = function() {
    feed('http://bibliotecaunl.blogspot.pt/feeds/posts/default?alt=rss', function (err, articles) {
      if (err) {throw err;}
      biblio.find().toArray(function(err, results){
        for (var i = 0; i < articles.length; i++) {
          var $ = cheerio.load(articles[i].content);
          var image = '';
          var tempVar = {
            'titulo': articles[i].title,
            'desc': $('.separator').text(),
            'image': $('img').toArray()[0].attribs.src,
            'link': articles[i].link,
            'publicado': articles[i].published
          };
          var exists = false;
          var completed = true;
          for(var a = 0; a < results.length; a++){
            if(results[a].link === tempVar.link) {
              exists = true;
            }
            if(tempVar.title === '' || tempVar.image === '') {
              completed = false;
            }
          }
          if(exists === false && completed === true) {
            biblio.insert(tempVar, function(err) {
              if(err){
                console.log(err);
              }
            });
          }
        }
        console.log('[Job] Biblio');
      });
    });
  };

  getBiblio();

  schedule.scheduleJob('* */24 * * *', getBiblio);
};
