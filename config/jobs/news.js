/*
 * Every 24 hours update news articles
 */

var feed = require('feed-read');
var cheerio = require('cheerio');

module.exports = function(db,schedule) {

  var news = db.collection('news');

  var getNews = function() {
    feed('http://www.fct.unl.pt/noticias/rss.xml', function (err, articles) {
      if (err) {throw err;}
      db.collection('news').find().toArray(function(err, results){
        for (var i = 0; i < articles.length; i++) {
          var $ = cheerio.load(articles[i].content);
          var tempVar = {
            'titulo': articles[i].title,
            'conteudo': $('.field.field-type-text.field-field-resumo p').text(),
            'link': articles[i].link,
            'publicado': articles[i].published
          };
          var exists = false;
          for(var a = 0; a < results.length; a++){
            if(results[a].link === tempVar.link) {
              exists = true;
            }
          }
          if(exists === false) {
            news.insert(tempVar, function() {});
          }
        }
        console.log('[Job] News');
      });
    });
  };

  getNews();

  schedule.scheduleJob('* */24 * * *', getNews);
};
