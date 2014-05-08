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


server.route({path: "/API/TV/Weather", method: "GET", config: {handler: getWeather}});
server.route({path: "/API/TV/Broadcast", method: "GET", config: {handler: getBroadcastList}});
server.route({path: "/API/TV/Content", method: "GET", config: {handler: getContentList}});
server.route({path: "/API/TV/Video", method: "GET", config: {handler: getVideoList}});


function getWeather(request, reply){
  req('http://api.wunderground.com/api/8375472c04b107a7/conditions/q/Portugal/Montijo.json', function(error, response, body){
    if (!error && response.statusCode == 200){
      body = JSON.parse(body);
      reply({
        temp: body.current_observation.temp_c,
        state: body.current_observation.icon
      });
    }
  });
}

//substituir por informacao a serio
function getBroadcastList(request, reply){
  var broadcastList =[{
    priority: 2,
    type: "informacao",
    text: "Este texto representa a informacao a passar em rodape a girar toda bonita"
  }];

  reply(broadcastList);
}

function getContentList(request, reply){
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

function getVideoList(request, reply){
  var videoList=[{
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
