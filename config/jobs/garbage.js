/*
 * Every 24 hours update canteen articles
 */

var get = require('superagent').get;
var cheerio = require('cheerio');

module.exports = function(db,schedule) {

  var food = db.collection('food');

  var getGarbage = function() {
    get('http://sas.unl.pt/cantina', function(res){
      if (res.statusCode === 200){
        var body = res.text;
        var $ = cheerio.load(body, {normalizeWhitespace: true});
        var garbage = {
          'Nome' : 'Cantina',
          'Sopa' : [],
          'Prato(s) do dia' : [],
          'Sobremesas' : []
        };
        var garbage;
        $('div.cantina').each(function () {
          if($(this).find('.title').text() === "Faculdade de Ciências e Tecnologia | Refeitório") {
            $(this).children('.lunch').children('ul').children('li').each(function () {
              if($(this).children('.course').text() === 'Sopa'){
                garbage.Sopa.push($(this).children('.dish').text());
              }
              if($(this).children('.course').text() === 'Dieta'){
                var plate = $(this).children('.dish').text();
                plate = plate.substr(0, plate.indexOf('-'))
                garbage['Prato(s) do dia'].push(plate);
              }
              if($(this).children('.course').text() === 'Prato'){
                var plate = $(this).children('.dish').text();
                plate = plate.split('; ');
                for (var i = 0; i < plate.length; i++) {
                  plate[i] = plate[i].substr(0, plate[i].indexOf('-'))
                  garbage['Prato(s) do dia'].push(plate[i]);
                };
              }
            });
          }
        });
        
        var d = new Date();
        
        food.insert({
          ementa : garbage,
          date : d
        }, function (err) {
          if (err) console.log(err);
        });
      }
    });
  };

  getGarbage();

  schedule.scheduleJob('* */24 * * *', getGarbage);
};
