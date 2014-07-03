module.exports = function(db) {
  var currentContent = db.collection('currentContent');
  var lastContent = db.collection('lastContent');


  var removeAll = function(){
    lastContent.remove({}, function (err) {});
    currentContent.remove({}, function (err) {});
  };

  removeAll();

};