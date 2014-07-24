define(["vendor/jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (request) {
buf.push("<div class=\"request\">" + (jade.escape((jade_interp = request) == null ? '' : jade_interp)) + "</div>");}("request" in locals_for_with?locals_for_with.request:typeof request!=="undefined"?request:undefined));;return buf.join("");
};

});
