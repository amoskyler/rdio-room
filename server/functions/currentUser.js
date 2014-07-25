User = require('../models/user')

module.exports = function (userRequest, callback){
  User.findOne({phone : userRequest.From}, function(err, user){
    if(err) return callback(err, false);
    if (user === null) return callback(null, false);
    else if(user.active === false) return user;
    return callback(null, user)
  });
};
