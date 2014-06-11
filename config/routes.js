var controller = require('require-directory')(module, './api'),
    routes = [];


/*
 * Root Route
 */

routes.push({path: '/', method: 'GET', config: { auth: 'passport' }, handler: function (request, reply) { reply().redirect('/');}});

/*
 * TV Routes
 */

routes.push({path: '/api/tv/weather', method: 'GET', config: controller.tv.weather});
routes.push({path: '/api/tv/broadcast', method: 'GET', config: controller.tv.broadcast});
routes.push({path: '/api/tv/content', method: 'GET', config: controller.tv.content});
routes.push({path: '/api/tv/video', method: 'GET', config: controller.tv.video});

/*
 * WEB Routes
 */

routes.push({path: '/api/web/videos', method: 'GET', config: controller.web.videos});
routes.push({path: '/api/web/video', method: 'GET', config: controller.web.video});
routes.push({path: '/api/web/favorites', method: 'GET', config: controller.web.fav.get});
routes.push({path: '/api/web/favorites', method: 'POST', config: controller.web.fav.post});
routes.push({path: '/api/web/login', method: 'GET', config: controller.web.auth.login});
routes.push({path: '/api/web/auth/google', method: 'GET', config: controller.web.auth.google});
routes.push({path: '/api/web/auth/google/return', method: 'GET', config: controller.web.auth.callback});
routes.push({path: '/api/web/logout', method: 'GET', config: controller.web.auth.logout});

module.exports = routes;
