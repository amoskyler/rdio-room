define(["vendor/jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (requests, JSON) {
buf.push("<div class=\"room\"><h1>Room</h1></div>");
// iterate requests
;(function(){
  var $$obj = requests;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var request = $$obj[$index];

buf.push("<p>" + (jade.escape((jade_interp = JSON.stringify(request)) == null ? '' : jade_interp)) + "</p>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var request = $$obj[$index];

buf.push("<p>" + (jade.escape((jade_interp = JSON.stringify(request)) == null ? '' : jade_interp)) + "</p>");
    }

  }
}).call(this);
}("requests" in locals_for_with?locals_for_with.requests:typeof requests!=="undefined"?requests:undefined,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined));;return buf.join("");
};

});
