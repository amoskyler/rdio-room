$(document).ready(function(){

  var IndexView = Backbone.View.extend({
    render:function(){
      if(window._loggedIn === false){
          this.$el.html("You are not logged in");
          return this;
      }
      else if(window._loggedIn === true){
        this.$el.html("You are logged in");
        return this;
      };
    }
  });
  var AppRouter = Backbone.Router.extend({

    routes:{
      '': 'index', //index view
    },

    index: function(){
      console.log("you're at the index");
      var view = new IndexView();
      $('.content').html(view.render().el);
    }

  });

  var appRouter = new AppRouter();
  Backbone.history.start({pushState:true});
});
