var Request = require('../models/requests')

module.exports = function(req, callback){
  var request = new Request();
  request.songName = req.body.name;
  request.roomId = req.body.roomId;
  request.save(function(err){
    if(err) return callback(err, false)
    else return callback(null, true)
  });
};
