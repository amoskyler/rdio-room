Request = require('../models/requests')

module.exports = function(router, requestAPI){
  router.route('/request')

  //get all requests
  .get(function(req, res) {
      Request.find(function(err, request) {
        if (err)
           res.send(err);
         res.json(request);
       });
  })

//Create a request
    .post(function(req, res){
      var request = new Request();
      request.songName = req.body.songName;
      request.requestBody = req.body.body;
      request.songId = req.body.songId;
      request.played = req.body.played;

      request.save(function(err){
        if(err)
          res.send(err);
        res.json({message: 'song request created!'});
      });
    });
};
