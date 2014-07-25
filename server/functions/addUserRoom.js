var Owner = require('../models/owner.js')

var User = require('../models/user.js')

module.exports = function (userRequest, callback){
  console.log(userRequest);
  var roomString = userRequest.Body.substring(0, 3);
  Owner.findOne({roomID: roomString}, 'roomID', function(err, roomID){
    if(err) return callback(err, false)
    else return callback(null, roomID)
  });
};
