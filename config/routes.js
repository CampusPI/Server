var controller = require('require-directory')(module, './api'),
    routes = [];


/*
 * Root Route
 */

routes.push({path: '/', method: 'GET', config: {handler: function (request, reply) {
  var app = require('../package.json');
  reply({
    Name: app.name,
    Version: app.version
  });
}}});


/*
 * TV Routes
 */

routes.push({path: '/api/tv/weather', method: 'GET', config: controller.tv.weather});
routes.push({path: '/api/tv/broadcast', method: 'GET', config: controller.tv.broadcast});
routes.push({path: '/api/tv/content', method: 'GET', config: controller.tv.content});
routes.push({path: '/api/tv/videos', method: 'GET', config: controller.tv.videos});
routes.push({path: '/api/tv/news', method: 'GET', config: controller.tv.news});

/*
 * WEB Routes
 */

//videos e artigos que passaram na TV
routes.push({path: '/api/web/stuff', method: 'GET', config: controller.web.stuff});

//Pesquisa de video ou artigo por ID
routes.push({path: '/api/web/stuff/{id}', method: 'GET', config: controller.web.stuff});

//Gostar de um video ou artigo
routes.push({path: '/api/web/stuff/{id}/like', method: ['GET','POST'], config: controller.web.like});

//Adicionar video ou artigo à lista dos favoritos
routes.push({path: '/api/web/stuff/{id}/favorite', method: ['GET','POST'], config: controller.web.favorite});

//Retornar user logado
routes.push({path: '/api/web/user', method: 'GET', config: controller.web.user});

module.exports = routes;
