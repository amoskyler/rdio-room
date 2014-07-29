Request = require('../models/requests');
checkUser = require('../functions/currentUser');
saveUser = require('../functions/saveUser');
updateUser = require('../functions/userUpdate')
addUserRoom = require('../functions/addUserRoom');
addRequestRoom = require('../functions/addRequestRoom');
removeUserRoom = require('../functions/removeUserRoom');
sendReply = require('../functions/sendReply');

module.exports = function(router, io, client, rdio){
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
    //  console.log(req.body.Body.toUpperCase().replace(/ /g,''))

    console.log("New request from: "+req.body.From);
    req.body.Body = req.body.Body.toUpperCase();

    if(req.body.Body.replace(/ /g, '') != "LEAVEROOM"){
      checkUser(req.body, function(err, user){
        console.log(err);
        if(!user){
          addUserRoom(req.body, function(err, roomInfo){
            if(err) console.log(err)

            else if(!roomInfo) //sendReply(req.body.From, "you're not currently subscribed to a room. Please enter a valid room code to continue", client)
              res.json({message: "You are not currently subscribed to a room. Please enter a valid room code to continue"})
            else{
              saveUser(req.body, roomInfo, function(err, success){
                if(err) res.send(err);
                else //sendReply(req.body.From, "You've been added to a room: "+ roomInfo.roomID, client)
                  res.json({message: "You've been added to a room: "+ roomInfo.roomID})
              })
            }
          })
        }
      else if(user && user.active === false && user.block != true){
        addUserRoom(req.body, function(err, roomInfo){
          if(err) console.log(err)
          else if(!roomInfo) //sendReply(req.body.From, "you're not currently subscribed to a room. Please enter a valid room code to continue", client)
            res.json({message: "You are not currently subscribed to a room. Please enter a valid room code to continue"})
          else{
            updateUser(user, roomInfo, true, function(err, success){
              if(err) res.json({message: err})
              else res.json({message: "You've been added to a room: "+roomInfo.roomID})
            });
          }
        })
      }
      else if(user.block){
        res.json({message: "You are currently blocked from participating"})
      }
      else{
        addRequestRoom(req.body, user, rdio, function(err, results){
          console.log(results);
          //check if song is flagged not to play
            if(results.permissions != false && results){
              io.to(user.roomID).emit('notify', {
                songName: results.name,
                songId: results.key,
                roomId: user.roomID,
                songInfo: results
              });
              //sendReply(req.body.From, 'Your request for '+results.name+' by '+results.artist+' has been added to the queue', client)
              res.json({message: 'Your request for '+results.name+' by '+results.artist+' has been added to the queue'})
            }
          else if(!err && !results) //sendReply(req.body.From, 'Song not found', client)
            res.json({message: "Song not found"});
          else if(results.permissions === false) //sendReply(req.body.From, 'No Explicit Songs in this Room ', client)
            res.json({message: "No Explicit Songs in this Room"});
          else //sendReply(req.body.From, 'There was a problem with the request', client)
            res.json({message: "There was a problem with the request'"});
        });
      }
      });
    }
  else{
    removeUserRoom(req.body, function(err, user){
      if(err)  //sendReply(req.body.From, 'Err unsubscribing', client)
        res.json({message: "Error unsubscribing"});
      else if(user.block) res.json({message: "You are currently blocked from participating"})
      else if(!user) //sendReply(req.body.From, 'You were not subscribed to a room', client)
        res.json({message: "you were not subscribed to a room"});
      else if(user) //sendReply(req.body.From, 'You have been unsubscribed from room: '+user.roomID, client)
        res.json({message: "You have been unsubscribed from a room: "+ user.roomID})
    });
  }
    });
};
