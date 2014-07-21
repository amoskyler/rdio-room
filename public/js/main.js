$(document).ready(function(){

  var OwnerModel = Backbone.Model.extend({
    urlRoot: '/api/owner'
  });

  var OwnerCollection = Backbone.Collection.extend({
    model: OwnerModel,
    url: '/api/owner'
  });

  var IndexView = Backbone.View.extend({
    render:function(){
      if(window._loggedIn === false){
          this.$el.html("You are not logged in.");
          return this;
      }
      else if(window._loggedIn === true){
        console.log(window._id);
        owner = new OwnerModel({id: window._id});
        owner.fetch({
         success: function(){
           //console.log(owner)
           console.log(JSON.stringify(owner));
         },
         error: function(){
           console.log("error")
         }
        });

        this.$el.html("You are logged in. Welcome "+window._name);
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
