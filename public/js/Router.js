define(function(require){

  var Index = require('views/index');
  var Login = require('views/login');
  var Room = require('views/room');

  var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index",
        "login": "login",
        "room/:id": "room",
    },

    index: function(){
      var view = new Index({
        el: ".main"
      });
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
