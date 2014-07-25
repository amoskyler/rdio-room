var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
        phone: {
          type: String
        },
        active: {
          type: Boolean,
          default: false
        },
        roomID: {
          type: String,
          required: true,
        }
});

module.exports = mongoose.model('User', userSchema);
