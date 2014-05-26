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
case 'delete':
  dbDelete();
  break;
default:
  dbBroadcast();
  dbContent();
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

function dbDelete() {
  console.log('delete');
}

function insert(col,o) {
  db.collection(col).remove({ '_id' : { $exists : true } }, function() {
    db.collection(col).insert(o);
    db.close();
  });
}
