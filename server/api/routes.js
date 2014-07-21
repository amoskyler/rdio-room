path = require('path');

Owner = require('../models/owner.js');

module.exports = function(router, ownerAPI, requestAPI){
  router.get('/', function(req, res) {
     res.json({ message: 'hooray! welcome to our api!' });
  });
  require('./ownerAPI.js')(router);
  require('./requestAPI.js')(router);

};
