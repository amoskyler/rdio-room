define(function(require){
  var Request = require('models/Request');
  var Auth = require('app/auth');
  var templ = require('templates/room');

  return Backbone.View.extend({
    template: templ,

    initialize: function(options){
      var self = this;
      this.model = new Request({id: options.room})
      this.model.fetch({
        success: function(data){
          self.render();
        },
        error: function(){console.log('error')}
      })
      console.log(options.room);
    },

    render: function(){
      if(!this.model) return this;
      console.log(this.model)
      this.$el.html(templ({
        requests: this.model.attributes
      }));
      return this;
    },
  });

});
