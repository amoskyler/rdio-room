
$(document).ready(function(){

  var socket = io.connect('http://amos.ngrok.com');
  socket.on('roomConnect', function (data) {
    console.log(data);
    socket.emit('clientConnect', { clientId: 'I have joined Rdio Room' });
  });
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
    urlRoot: '/api/request'
  });

  var RequestCollection = Backbone.Collection.extend({
    //model: RequestModel,
    url: '/api/request'
  });

  var IndexView = Backbone.View.extend({
    render:function(){
      if(window._loggedIn === false){
          this.$el.html("You are not logged in.");
          return this;
      }
      else if(window._loggedIn === true){

        //RDIO API
        R.ready(function() {
        R.player.play({source: "a3032151"}); // Alice In Chains - The Devil Put Dinosaurs Here
        R.player.on("change:playingTrack", function(track) {
          $(".icon img").attr("src", track.get("icon"));
          $(".track").text("Track: " + track.get("name"));
          $(".album-title").text("Album: " + track.get("album"));
          $(".artist").text("Artist: " + track.get("artist"));
        });
      });
      //END RDIO API
        console.log(window._id);
        var owner = new OwnerModel({id: window._id});
        owner.fetch({
         success: function(){
           console.log("Owner Profile: "+ JSON.stringify(owner));
         },
         error: function(){
           console.log("error");
         }
        });

        this.$el.html("You are logged in. Welcome "+window._name);
        return this;
      }
    }
  });

  var RequestView = Backbone.View.extend({
      initialize: function(){
        var self = this;
        this.model = new RequestModel();
        this.model.fetch({
          success: function(data){
            console.log(data)
            self.render()
            },
          error: function(){console.log("error")}
        });
        return this;
      },

    render: function(){
      if (!this.model) return this;
      console.log(this.model);
      this.$el.html(this.model);

      return this;
    }
  });


  var AppRouter = Backbone.Router.extend({

    routes:{
      '': 'index', //index view
    },

    index: function(){
      console.log("you're at the index");
      var request = new RequestView();
      var index = new IndexView();
      $('.content').html(index.render().el);
      $('.requests').html(request.render().el);
    }

  });

  var appRouter = new AppRouter();
  Backbone.history.start({pushState:true});
});
