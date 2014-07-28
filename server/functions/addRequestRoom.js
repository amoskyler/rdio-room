var Owner = require('../models/owner')
var Request = require('../models/requests')
var User = require('../models/user')

module.exports = function (userRequest, user, rdio, callback){

// Make an unauthenticated request
    rdio.makeRequest('search', {query: userRequest.Body, types: 'Track'},function(){
      var results = arguments[1].result.results[0]
      if(arguments[1].result.track_count != 0){
        //check if users have permission to request explicit tracks
        if(results.isExplicit === user.explicitPermission){
          results.permission = true;
          var request = new Request();
          request.songName = results.name;
          request.allData = results;
          request.roomId = user.roomID;
          request.explicit = results.isExplicit;
          request.phoneNumber = userRequest.From;
          request.save(function(err){
            if(err) return callback(err, false)
            else return callback(null, results)
          });
        }
      else {results.permission = false; return callback(null, results);}
      }
      else return callback(null, false);
    });

};
