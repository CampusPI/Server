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
routes.push({path: '/api/tv/videos', method: 'GET', config: controller.tv.videos});
routes.push({path: '/api/tv/news', method: 'GET', config: controller.tv.news});
routes.push({path: '/api/tv/biblio', method: 'GET', config: controller.tv.biblio});
routes.push({path: '/api/tv/schedule', method: 'GET', config: controller.tv.schedule});
routes.push({path: '/api/tv/strikes', method: 'GET', config: controller.tv.strikes});
routes.push({path: '/api/tv/broadcasts', method: 'GET', config: controller.tv.broadcasts});
routes.push({path: '/api/tv/sidebar', method: 'GET', config: controller.tv.sidebar});
routes.push({path: '/api/tv/currentContent', method: ['GET','POST'], config: controller.tv.currentContent});
routes.push({path: '/api/tv/lastContent', method: 'GET', config: controller.tv.lastContent});



/*
 * WEB Routes
 */

routes.push({path: '/api/web/videos', method: 'GET', config: controller.web.videos});
routes.push({path: '/api/web/news', method: 'GET', config: controller.web.news});
routes.push({path: '/api/web/biblio', method: 'GET', config: controller.web.biblio});
routes.push({path: '/api/web/video/{id}', method: 'GET', config: controller.web.video});
routes.push({path: '/api/web/favorites', method: 'GET', config: controller.web.fav.get});
routes.push({path: '/api/web/favorites', method: 'POST', config: controller.web.fav.post});

//Retornar user logado
routes.push({path: '/api/web/user', method: 'GET', config: controller.web.user});


/*
 * Development Routes
 */

routes.push({path: '/api/dev/schedule', method: 'POST', config: controller.dev.schedule});
routes.push({path: '/api/dev/broadcast', method: 'POST', config: controller.dev.broadcast});
routes.push({path: '/api/dev/cheats', method: 'GET', config: controller.dev.cheats});



module.exports = routes;
