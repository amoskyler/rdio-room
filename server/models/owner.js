var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    }
});

module.exports = mongoose.model('Owner', ownerSchema);
