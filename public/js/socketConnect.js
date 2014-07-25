define(function(require) {
  return function(id, auth){
      var socket = io.connect('http://amos.ngrok.com');
      socket.on('roomConnect', function (data) {
        socket.emit('clientConnect', { clientId: 'I have joined Rdio Room' });
        socket.emit('subscribe', {room: id});
        console.log(data);
      });
      socket.on('notify', function(data){
        console.log(data);
        this.remove();
        this.unbind();
        var view = new Room({
          el: ".main",
          room: id
        });

      });
  }
});
