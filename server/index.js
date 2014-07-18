var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
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

var io = require('socket.io').listen(server);

require('./routes')(app, passport);
console.log("server listening on port: "+port)


server.listen(port);
