Request = require('../models/requests')

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
      console.log(req.body)
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
    });
};
