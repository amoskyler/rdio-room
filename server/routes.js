var path = require('path');


module.exports = function (app, passport){

  app.get('/js/isLoggedIn.js', function(req, res){


    src = "window._loggedIn = false";
    if(req.user){
      console.log(req.user);
      src = "window._loggedIn = true;";
      src += "window._id = '"+req.user._id+"';";
      src += "window._name = '"+req.user.name+"';";
      src += "window._rdioURL = '"+req.user.rdioURL+"';";
      src += "window._roomID = '"+req.user.roomID+"';";
    }

    res.set("Content-Type", 'application/javascript');
    res.send(200, src);
  });

  app.get('/auth/rdio/callback', passport.authenticate('rdio'), function(req, res){
    res.redirect('/')
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/api', function(req, res){

  });

  app.get('*', function(req, res){
    res.sendfile(path.join(__dirname, '../public/index.html'));
  });

};
