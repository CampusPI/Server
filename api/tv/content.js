var getContent = function (request, reply){
  var contentList =[
    {
      type: 'Transportes',
      obj: '',
      title: 'Fertagus',
      content: [
        ['Roma-Areeiro', '15:10'],
        ['Roma-Areeiro', '15:30'],
        ['Setubal', '16:00'],
        ['Coina', '16:20']
      ]
    }
  ];

  reply(contentList);
};

module.exports = getContent;
