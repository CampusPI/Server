var req = require('request');
var Hapi = require("hapi");
var server = new Hapi.Server(8080, "localhost");

if (!module.parent) {
  server.start(function() {
    console.log("Server started", server.info.uri);
  });
}

server.route({
  path: "/",
  method: "GET",
  handler: function(request, reply) {
    reply({"response": "ok"});
  }
});


server.route({path: "/api/tv/weather", method: "GET", config: {handler: getWeather}});
server.route({path: "/api/tv/broadcast", method: "GET", config: {handler: getBroadcast}});
server.route({path: "/api/tv/content", method: "GET", config: {handler: getContent}});
server.route({path: "/api/tv/video", method: "GET", config: {handler: getVideo}});


function getWeather(request, reply){
  req('http://api.wunderground.com/api/8375472c04b107a7/conditions/q/Portugal/Almada.json', function(error, response, body){
    if (!error && response.statusCode == 200){
      body = JSON.parse(body);
      reply({
        temp: body.current_observation.temp_c,
        state: body.current_observation.icon
      });
    }
  });
}

function getBroadcast(request, reply){
  var broadcastList = [
    {
      priority: 2,
      type: 'Importante',
      text: 'Este é o primeiro aviso que avisa aos que foram avisados previamente que se pretenderem continuar a ser avisados terão de nos avisar.'
    },
    {
      priority: 1,
      type: 'Greve',
      text: 'Este é o segundo aviso que cenas fixes.'
    }
  ];

  reply(broadcastList);
}

function getContent(request, reply){
  var contentList =[{
    type: "Transportes",
    obj: "",
    title: "Fertagus",
    content: [
    ["Roma-Areeiro", "15:10"],
    ["Roma-Areeiro", "15:30"],
    ["Setubal", "16:00"],
    ["Coina", "16:20"]
    ]
  }];

  reply(contentList);
}

function getVideo(request, reply){
  var videoList = [
    {
      link: "www.youtube.com/vid1",
      title: "Coelho1",
      hour: "15:30",
      length: "2:50",
      description: "coelho aos saltos muito rapido"
    },
    {
      link: "www.youtube.com/vid2",
      title: "Coelho2",
      hour: "15:30",
      length: "2:50",
      description: "coelho aos saltos muito rapido"
    }
  ];

  reply(videoList);
}

module.exports = server;
