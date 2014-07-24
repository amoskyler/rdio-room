define(function(require){

  var Index = require('views/index');
  var Login = require('views/login');
  var Room = require('views/room');
  var NoAuth = require('views/noAuth');
  var auth = require('app/auth');
  var socketConnect = require('app/socketConnect')

  var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index",
        "login": "login",
        "room/:id": "room",
        "request" : "request",
        "noAuth"  : "noAuth",
    },

    index: function(){
      if(!auth.loggedIn()) return auth.login()

      var view = new Index({
        el: ".main"
      });
    },

    login: function(){
      var view = new Login({
        el: ".main"
      })
    },

    noAuth: function(){
      var view = new NoAuth({
        el: ".main"
      })
    },

    room: function(id){
      if(auth.roomID() != id) return auth.noRoomAuth()

      socketConnect(id, auth)
      var view = new Room({
        el: ".main",
        room: id
      });
    }
});
  appRouter = new AppRouter();
});
