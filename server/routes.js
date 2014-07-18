var path = require('path');

module.exports = function (app, passport){

  app.get('/', function(req, res){
    res.sendfile(path.join(__dirname, '../public/index.html'));
  });

  app.get('/js/isLoggedIn.js', function(req, res){


    src = "window._loggedIn = false";
    if(req.user){
      src = "window._loggedIn = true"
      src += "window._id = "+req.user._id+";"
      src += "window._name = "+req.user.name+";"
    }

    res.set("Content-Type", 'application/javascript');
    res.send(200, src);
  });
};
