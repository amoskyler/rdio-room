$(document).ready(function(){
//song request models

  var OwnerModel = Backbone.Model.extend({
    urlRoot: '/api/owner'
  });

  var OwnerCollection = Backbone.Collection.extend({
    model: OwnerModel,
    url: '/api/owner'
  });
//song request models
  var RequestModel = Backbone.Model.extend({
    urlRoot: '/api/requests'
  });

  var RequestCollection = Backbone.Collection.extend({
    model: RequestModel,
    url: '/api/request'
  });

  var IndexView = Backbone.View.extend({
    render:function(){
      if(window._loggedIn === false){
          this.$el.html("You are not logged in.");
          return this;
      }
      else if(window._loggedIn === true){
        console.log(window._id);
        var owner = new OwnerModel({id: window._id});
        owner.fetch({
         success: function(){
           console.log("Owner Profile: "+ JSON.stringify(owner));
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
      var index = new IndexView();
      var request = new RequestView();
      $('.content').html(index.render().el);
      $('.requests').html(request.render().el);
    }

  });

  var appRouter = new AppRouter();
  Backbone.history.start({pushState:true});
});
