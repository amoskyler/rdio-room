Request = require('../models/requests');
checkUser = require('../functions/currentUser');
saveUser = require('../functions/saveUser');
addUserRoom = require('../functions/addUserRoom')
addRequestRoom = require('../functions/addRequestRoom')
removeUserRoom = require('../functions/removeUserRoom')

module.exports = function(router, io){
  router.route('/request/:request_id')
  //get a single request
    .get(function(req, res){
      Request.find({'roomId': req.params.request_id}, function(err, request){
        if(err) return err
        else res.json(request);
      });
    })

    .put(function(req, res){
      // use our request model to find the request we want
      Request.findById(req.params.request_id, function(err, request) {

          if (err) res.send(err);
          else if(!request) res.json({message: "Request has not been queued"})
          else{
          request.played = req.body.played; 	// update the requests's info

          // save the bear
          request.save(function(err) {
            if (err)
              res.send(err);
            else
              res.json({ message: "Request has been played" });
          });
        }
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

    if(req.body.Body != "unsubscribe"){
      checkUser(req.body, function(err, user){
        if(!user){
          addUserRoom(req.body, function(err, roomId){
            if(err) console.log(err)
            else if(!roomId) res.json({message: "room does not exist"})
            else{
              saveUser(req.body, function(err, success){
                if(err) res.send(err);
                else res.json({message: "You've been added to a room: "+ roomId})
              })
            }
          })
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
    }
  else{
    removeUserRoom(req.body, function(err, user){
      if(err) res.json({message: "Error unsubscribing"});
      if(!user) res.json({message: "you were not subscribed to a room"});
      if(user) res.json({message: "You have been unsubscribed from a room: "+ user.roomID})
    });
  }
    });
};
