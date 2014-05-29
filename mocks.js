var mongojs = require('mongojs');
var db = mongojs(require('./config/db').url);
var args = process.argv.slice(2);

switch(args[0]) {
case 'broadcast':
  dbBroadcast();
  break;
case 'content':
  dbContent();
  break;
case 'videos':
  dbVideos();
  break;
case 'delete':
  dbDelete();
  break;
default:
  dbBroadcast();
  dbContent();
  dbVideos();
  console.log('all');
}

function dbBroadcast() {

  var o = [
    {
      priority: 1,
      type: 'Greve',
      text: 'MTS - Greve às horas extraordinárias durante o dia 2 de Junho das 16 às 22 horas.'
    },
    {
      priority: 1,
      type: 'Importante',
      text: 'Dia 2 de Junho o Parque do DI estará encerrado para manutenção. Pedimos desculpa pelo incómodo.'
    }
  ];

  insert('broadcasts',o);
}

function dbContent() {

  var o = [
    {
      type: 'Ementas',
      content: [
        {
          'name': 'Casa do Pessoal',
          'Sopa': ['Legumes'],
          'Prato(s) do dia': [
            'Esparguete à bolonhesa',
            'Lulas recheadas',
            'Bitoque'
          ],
          'Sobremesas': ['Arroz doce', 'Salada de frutas']
        },
        {
          'name': 'Teresa Gato',
          'Sopa': ['Hortaliça'],
          'Prato(s) do dia': [
            'Lombinhos de vitela à casa',
            'Bacalhau à Brás'
          ],
          'Sobremesas': ['Doces Vaiados', 'Papa Doce', 'Fruta da época']
        }
      ],
    },
  ];

  insert('contents',o);
}

function dbVideos() {

  var o = [
    {
      id: '526yUdkZN5A',
      name: 'EXPO FCT 2011',
      thumbnail: 'http://img.youtube.com/vi/526yUdkZN5A/0.jpg'
    },
    {
      id: 'juVziawQpCU',
      name: 'EXPO FCT 2012',
      thumbnail: 'http://img.youtube.com/vi/juVziawQpCU/0.jpg'
    },
    {
      id: '-WVyW8qy0Hs',
      name: 'NTA Expo FCT 2013',
      thumbnail: 'http://img.youtube.com/vi/-WVyW8qy0Hsv/0.jpg'
    },
    {
      id: 'Dw5TXmGikN8',
      name: 'Sobre a Biblioteca FCTUNL',
      thumbnail: 'http://img.youtube.com/vi/Dw5TXmGikN8/0.jpg'
    },
  ];

  insert('videos',o);
}

function dbDelete() {
  console.log('delete');
}

function insert(col,o) {
  db.collection(col).remove({ '_id' : { $exists : true } }, function() {
    db.collection(col).insert(o);
    console.log('[DB]: Inserted on',col);
    db.close();
  });
}
