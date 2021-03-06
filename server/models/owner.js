var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var makeid = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//generate random 3 length string
    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};


var ownerSchema = mongoose.Schema({
        ownerId: {
          type: String
        },
        token: {
          type: String
        },
        rdioURL: {
          type : String
        },
        name: {
          type: String
        },
        authLevel: {
          type: Number,
          default: 1
        },
        roomID: {
          type: String,
          required: true,
          default: makeid()
        },
        active: {
          type: Boolean,
          default: true
        },
        explicit: {
          type: Boolean,
          default: true
        }
});

module.exports = mongoose.model('Owner', ownerSchema);
