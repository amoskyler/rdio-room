define(function(require){
  var templ = require('templates/login');
  
  return Backbone.View.extend({

    template: templ,

    initialize: function(){
      this.render();
      return this;
    },

    render: function(){
      this.$el.html(templ);
      return this;
    }

  });

});
