var User = require('../models/user.js')

module.exports = function (user, roomInfo, mark, callback){
  console.log("from "+user.phone);
  console.log(roomInfo.roomID);
  User.update({phone: user.phone}, {$set: {active: mark, roomID: roomInfo.roomID}}, function(err, success, numberAffected){
    if(err) return callback(err, null)
    else if(numberAffected === 0) return callback(null, false)
    else return callback(null, true);
  });
};
