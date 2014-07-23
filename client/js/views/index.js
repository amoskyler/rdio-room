define(function(require){

  templ = require('templates/main');

  return Backbone.View.extend({

    template: templ,

    initialize: function(){
      this.render();
      return this;
    },

    render: function(){
      this.$el.html();
      return this;
    }

  });
});
