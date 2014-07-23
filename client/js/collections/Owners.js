define(function(require){
  Owner = require("models/Owner")

  return Backbone.Collection.extend({
    model: OwnerModel,
    url: '/api/owner'
  });
});
