define(function(require){
  Owner = require("models/Owner")
  return Backbone.Collection.extend({
    model: Owner,
    url: '/api/owner'
  });
});
