path = require('path');

Owner = require('../models/owner.js');

module.exports = function(router, io, client, rdio){
  router.get('/', function(req, res) {
     res.json({ message: 'hooray! welcome to our api!' });
  });
  require('./ownerAPI.js')(router);
  require('./requestAPI.js')(router, io, client, rdio);
// Make an unauthenticated request
};
