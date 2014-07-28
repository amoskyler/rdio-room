var User = require('../models/user.js')

module.exports = function (userRequest, roomInfo, callback){
  var user = new User();
  user.roomID = userRequest.Body.replace(/ /g, '');
  user.phone = userRequest.From;
  user.active = true;
  user.explicitPermission = roomInfo.explicit;
  user.save(function(err){
    if(err) return callback(err, false);
    else return callback(null, true);
  });
};
