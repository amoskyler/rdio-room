define(function() {
  var auth;
  auth = {
    loggedIn: function() {
      return window._loggedIn;
    },
    id: function() {
      return window._id;
    },
    name: function() {
      return window._name;
    },
    roomID: function(){
      return window._roomID;
    },
    removeRequest: function(){
      this.model.save({played: 'true'})
    },
    login: function(){
      Backbone.history.navigate('/login', {trigger: true});
    },
    noRoomAuth: function(){
      Backbone.history.navigate('/noAuth', {trigger: true})
    }
  };
  return auth;
});
