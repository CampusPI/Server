var controller = require('require-directory')(module, './api'),
    routes = [];


/*
 * Root Route
 */

routes.push({path: '/', method: 'GET', config: {handler: function (request, reply) {reply({respose: 'hello!'});}}});


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

routes.push({path: '/api/web/videos', method: 'GET', config: controller.web.videos});
routes.push({path: '/api/web/video', method: 'GET', config: controller.web.video});
routes.push({path: '/api/web/favorites', method: 'GET', config: controller.web.fav.get});
routes.push({path: '/api/web/favorites', method: 'POST', config: controller.web.fav.post});


module.exports = routes;
