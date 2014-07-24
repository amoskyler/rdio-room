define(function(require){
  Request=require("models/Request")
  return Backbone.Collection.extend({
    model: Request,
    url: '/api/request'
  });
});
