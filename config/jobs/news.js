var feed = require("feed-read");
var cheerio = require('cheerio');


module.exports = function(db,schedule) {

    var news = db.collection('news');

    schedule.scheduleJob('* */24 * * *', function() {

        feed("http://www.fct.unl.pt/en/noticias/rss.xml", function (err, articles) {
            if (err) throw err;

            var dbRes = new Array();
            db.collection('news').find().toArray(function(err, results){
                for (var i = 0; i < articles.length; i++) {
                    $ = cheerio.load(articles[i].content);

                    tempVar = {
                        "titulo": articles[i].title,
                        "conteudo": $('.field.field-type-text.field-field-resumo p').text(),
                        "link": articles[i].link,
                        "publicado": articles[i].published
                    };
                    console.log("cenas");
                    //if link n existir repetido
                    var exists = false;
                    for(int = 0; i < results.length; i++){
                        if(results[i].link == tempVar.link)
                            exists = true;
                    }
                    if(exists == false)
                        news.insert(tempVar);
                }
            });
        });
    });
};