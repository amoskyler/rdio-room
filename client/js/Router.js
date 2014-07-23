define(function(require){

  var index = require('views/index');
  var login = require('views/login');
  var room = require('views/room');

  var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index",
        "login": "login",
        "room/:id": "room",
    },

    index: function(){
      console.log(this);
    },

    login: function(){
      console.log(this);
    },

    room: function(id){
      console.log(this);
    }

  });

  appRouter = new AppRouter();
});
