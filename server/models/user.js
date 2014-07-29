var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
        phone: {
          type: String
        },
        active: {
          type: Boolean,
          default: true
        },
        roomID: {
          type: String,
          required: true,
        },
        numRequests:{
          type: Number,
          default: 0
        },
        block:{
          type: Boolean,
          default: false
        },
        explicitPermission: {
          type: Boolean,
          default: true
        }
});

module.exports = mongoose.model('User', userSchema);
