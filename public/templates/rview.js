define(["vendor/jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (JSON, request) {
buf.push("<div class=\"room\"><h1>Room</h1><p>" + (jade.escape((jade_interp = JSON.stringify(request)) == null ? '' : jade_interp)) + "</p></div>");}("JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined,"request" in locals_for_with?locals_for_with.request:typeof request!=="undefined"?request:undefined));;return buf.join("");
};

});
