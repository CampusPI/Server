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


/*
 * WEB Routes
 */

routes.push({path: '/api/web/login', method: 'GET', config: controller.web.auth.getLogin});
routes.push({path: '/api/web/login', method: 'POST', config: controller.web.auth.postLogin});
// routes.push({path: '/api/web/auth/google/return', method: 'GET', config: controller.web.auth.callback});
routes.push({path: '/api/web/logout', method: 'GET', config: controller.web.auth.logout});

routes.push({path: '/api/web/user', method: 'GET', config: controller.web.user});

routes.push({path: '/api/web/videos', method: 'GET', config: controller.web.videos});
routes.push({path: '/api/web/video/{id}', method: 'GET', config: controller.web.video});
routes.push({path: '/api/web/favorites', method: 'GET', config: controller.web.fav.get});
routes.push({path: '/api/web/favorites', method: 'POST', config: controller.web.fav.post});


module.exports = routes;
