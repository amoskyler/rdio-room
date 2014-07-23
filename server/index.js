var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var bodyParser = require('body-parser')
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var jade = require('jade');
var passport = require('passport');
var flash = require('connect-flash');
var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
//create router
var router = express.Router();

mongoose.connect(configDB.url);
require('./config/passport')(passport);
app.use(cookieParser());
app.use(session({secret: "thisisthesecret"}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'../public')));

//configure router
//isAuthenticated removed during development
router.use(function(req, res, next) {
  // do logging
  if(req.method === 'GET'){
    console.log("A user has made a GET request.");
  }
  else if(req.method === 'PUT'){
    console.log('a user has made a PUT request with the following content: '+JSON.stringify(req.body));
  }
  else if(req.method === 'POST'){
    console.log("A user has made a POST request");
  }
  else if(req.method==="DELETE"){
    console.log("A user has made a DELETE request");
  };
  next(); // make sure we go to the next routes and don't stop here
});

//register routers with app
app.use('/api', router);

var io = require('socket.io')(server);


require('./routes')(app, passport, io);
require('./api/routes')(router);
console.log("server listening on port: "+port)

io.on('connection', function (socket) {
  socket.emit('roomConnect', { Message: 'Welcome to Rdio Room' });
  socket.on('clientConnect', function (data) {
    console.log(data);
  });
});

server.listen(port);

function isAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    console.log("Authorized API Request from "+req.user.name);
    return next();
  }
  else{
    console.log("you're not logged in")
    res.json({ message: 'You are not authorized to access this API' });
  }
}
