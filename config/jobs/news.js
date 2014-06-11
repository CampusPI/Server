var feed = require("feed-read");
var cheerio = require('cheerio');


module.exports = function(db,schedule) {

    var news = db.collection('news');

    schedule.scheduleJob('* */24 * * *', function() {

        feed("http://www.fct.unl.pt/en/noticias/rss.xml", function (err, articles) {
            if (err) throw err;
            // Each article has the following properties:
            //
            //   * "title"     - The article title (String).
            //   * "author"    - The author's name (String).
            //   * "link"      - The original article link (String).
            //   * "content"   - The HTML content of the article (String).
            //   * "published" - The date that the article was published (Date).
            //   * "feed"      - {name, source, link}
            //
            //var objArray = new Array(articles.length);
            for (var i = 0; i < articles.length; i++) {
                $ = cheerio.load(articles[i].content);

                tempVar = {
                    "titulo": articles[i].title,
                    "conteudo": $('.field.field-type-text.field-field-resumo p').text(),
                    "link": articles[i].link,
                    "publicado": articles[i].published
                };
                //if link n existir repetido
                news.insert(tempVar);

                console.log(tempVar);
                console.log(" ");
                console.log(" ");

                //objArray[i] = tempVar;
            }
        });
    });
};