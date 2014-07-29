User = require('../models/user')

module.exports = function (userRequest, callback){
  User.findOne({phone : userRequest.From}, function(err, user){
    console.log(user);
    if(err) return callback(err, false);
    if (user === null) return callback(null, false);
    else if(user.active === false) return callback(null, user);
    return callback(null, user)
  });
};
