define(function(require) {

  return function(id, auth){

    if(id === auth.roomID()){
      var socket = io.connect('http://amos.ngrok.com');
      socket.on('roomConnect', function (data) {
        console.log(data);
        socket.emit('clientConnect', { clientId: 'I have joined Rdio Room' });
        socket.emit('subscribe', {room: auth.roomID()});
      });

      socket.on('notify', function(data){
        console.log(data)
        var view = new Room({
          el: ".main",
          room: id
        });

      });
    }
    else console.log("This is not your room")
  }

});
