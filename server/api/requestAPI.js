Request = require('../models/requests');
checkUser = require('../functions/currentUser');
saveUser = require('../functions/saveUser');
addUserRoom = require('../functions/addUserRoom')
addRequestRoom = require('../functions/addRequestRoom')

module.exports = function(router, io){
  router.route('/request/:request_id')
  //get a single request
    .get(function(req, res){
      Request.find({'roomId': req.params.request_id}, function(err, request){
        if(err) return err
        else res.json(request);
      });
    })

  router.route('/request')

  //get all requests
  .get(function(req, res) {
      Request.find(function(err, request) {
        if (err)
           res.send(err);
        else
          res.json(request);
       });
  })

//Create a request
    .post(function(req, res){
    console.log("New request from: "+req.body.From);
      checkUser(req.body, function(err, user){
        if(!user){
          saveUser(req.body, function(err, success){
            if(err) console.log(err);
            else if(success) {
              console.log("Success")
              addUserRoom(user, req.body, function(err, roomId){
                if(err) res.send(err);
                else if(!roomId) res.json({message: "room does not exist"})
                else res.json({message: "room exists: "+roomId})
              })
            };
          });
        }
      else{
        addRequestRoom(req.body, user.roomID, function(err, success){
            if(success){
              io.to(user.roomID).emit('notify', {
                songName: req.body.Body,
                body: req.body.Body,
                songId: req.body.Body,
                roomId: user.roomID,
              });
              res.json({message: 'song request created!'});
            }
          else res.json({message: 'There was a problem with the request'})
        });
      }
      });

    });
};
