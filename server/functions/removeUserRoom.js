var User = require('../models/user.js')

module.exports = function (user, callback){
  console.log(user);
  User.findOne({phone: user.From}, function(err, user){
    if(err) callback(err, false)
    else if(!user){callback(null, false)}
    else {user.remove(); callback(null, user);};
    });
};
