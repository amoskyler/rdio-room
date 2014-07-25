var Owner = require('../models/owner')
var Request = require('../models/requests')
var User = require('../models/user')

module.exports = function (userRequest, roomId, callback){

    var request = new Request();
    request.songName = userRequest.Body;
    request.roomId = roomId;
    request.phoneNumber = userRequest.From

    request.save(function(err){
      if(err) return callback(err, false)
      else return callback(null, true)
    });

};
