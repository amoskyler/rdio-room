var Owner = require('../models/owner')
var Request = require('../models/requests')
var User = require('../models/user')

module.exports = function (userRequest, roomId, callback){


  User.findOne({ phone: userRequest.From }, function (err, user){
    if(err) console.log(err)
    else if((user === null)) console.log("the user is null")
    user.roomID = roomId;
    user.save();


    var request = new Request();
    request.songName = userRequest.Body;
    request.roomId = roomId;
    request.phoneNumber = userRequest.From

    request.save(function(err){
      if(err) return callback(err, false)
      else return callback(null, true)
    });


  });

};

/*

var request = new Request();
request.songName = req.body.Body;
request.requestBody = req.body.Body;
request.songId = req.body.From;
request.roomId = req.body.Body;
request.phoneNumber = req.body.From;

request.save(function(err){
  if(err){
    console.log(err)
    res.send(err);
  }
  else{
  res.send({message: 'song request created!'});
  console.log(req.body.From)

  //Emit to request info to front end
  io.to(req.body.Body).emit('notify', {
    songName: req.body.Body,
    body: req.body.Body,
    songId: req.body.From,
    roomId: req.body.Body,
    phoneNumber: req.body.phoneNumber
    })
  }
});
*/
