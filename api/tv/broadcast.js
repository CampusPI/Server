var getBroadcast = function (request, reply){
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
};

module.exports = getBroadcast;
