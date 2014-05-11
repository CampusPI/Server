var controller = require('require-directory')(module, './api'),
    req = require('request'),
    routes = [];


/*
 * Root Route
 */

routes.push({path: "/", method: "GET", config: {handler: function (request, reply) {reply({respose: 'hello!'});}}});


/*
 * TV Routes
 */

routes.push({path: "/api/tv/weather", method: "GET", config: {handler: controller.tv.weather}});
routes.push({path: "/api/tv/broadcast", method: "GET", config: {handler: controller.tv.broadcast}});
routes.push({path: "/api/tv/content", method: "GET", config: {handler: controller.tv.content}});
routes.push({path: "/api/tv/video", method: "GET", config: {handler: controller.tv.video}});

module.exports = routes;
