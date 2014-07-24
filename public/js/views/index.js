define(function(require){
  var Owner = require('models/Owner');
  var templ = require('templates/index');
  var auth = require('app/auth');
  console.log(auth.loggedIn());
  return Backbone.View.extend({
    template: templ,

    initialize: function(){


      var self = this;
      this.model = new Owner({id: auth.id()});
      console.log(this.model);
      this.model.fetch({
        success: function(data){
          console.log(data);
          self.render();
        },
        error: function(){console.log("error")}
      });
      return this;
    },

    render: function(){
      if(!this.model) return this;
      console.log(this.model.attributes)
      this.$el.html(templ({
        owner: this.model
      }));
      return this;
    }

  });



});
