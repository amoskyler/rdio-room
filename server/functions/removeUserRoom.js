var User = require('../models/user.js')

module.exports = function (user, callback){
  console.log(user);
  User.findOne({phone: user.From}, function(err, user){
    if(err) callback(err, false)
    else if(!user){callback(null, false)}
    else if(user.block) callback(null, user)
    //else {user.remove(); callback(null, user);};
    else{
      user.active = false;
      user.save(function(err){
        if(err) return callback(err, null)
        else return callback(null, user)
      })
    }
    });
};
