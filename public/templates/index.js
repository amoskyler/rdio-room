define(["vendor/jade"],function(jade){

return function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (owner) {
buf.push("<owner><div class=\"welcome\"><h3>Welcome to Rdio Room!</h3><a" + (jade.attr("href", 'http://rdio.com' + (owner.get("rdioURL")) + '', true, false)) + ">" + (jade.escape((jade_interp = owner.get("name")) == null ? '' : jade_interp)) + "</a><br/>Owner id: " + (jade.escape((jade_interp = owner.get("ownerId")) == null ? '' : jade_interp)) + "<br/><a href=\"/logout\">Logout</a><br/><br/>Go to you're room! <a" + (jade.attr("href", '/room/' + (owner.get("roomID")) + '', true, false)) + ">" + (jade.escape((jade_interp = owner.get("roomID")) == null ? '' : jade_interp)) + "</a></div></owner>");}("owner" in locals_for_with?locals_for_with.owner:typeof owner!=="undefined"?owner:undefined));;return buf.join("");
};

});
