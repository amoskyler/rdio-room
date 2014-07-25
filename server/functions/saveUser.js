var User = require('../models/user.js')

module.exports = function (userRequest, callback){
  var user = new User();
  user.roomID = userRequest.Body;
  user.phone = userRequest.From;
  user.active = true;
  user.save(function(err){
    if(err) return callback(err, false);
    else return callback(null, true);
  });
};
