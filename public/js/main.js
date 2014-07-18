$(document).ready(function(){

  var IndexView = Backbone.View.extend({
    render:function(){
      this.$el.html("<a href = 'http://amos.ngrok.com'>LOGIN</a>")
      return this;
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
