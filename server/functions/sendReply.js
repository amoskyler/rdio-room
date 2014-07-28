module.exports = function(toNumber, body, client){

client.messages.create({
    body: body,
    to: toNumber,
    from: "+14803516583"
}, function(err, message) {
    process.stdout.write(message.sid);
});
  return "success"
};
