var Owner = require('../models/owner')
var Request = require('../models/requests')
var User = require('../models/user')

module.exports = function (userRequest, roomId, rdio, callback){

// Make an unauthenticated request
    rdio.makeRequest('search', {query: userRequest.Body, types: 'Track'},function(){

      if(arguments[1].result.track_count != 0){
        var results = arguments[1].result.results[0]
        console.log(results.isExplicit)
        var request = new Request();
        request.songName = results;
        request.roomId = roomId;
        request.explicit = results.isExplicit;
        request.phoneNumber = userRequest.From;

        request.save(function(err){
          if(err) return callback(err, false)
          else return callback(null, results)
        });
      }
      else{
        return callback(null, false);
      }
    });

};
