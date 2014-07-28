var mongoose = require('mongoose');
var Schema = mongoose.Schema

var requestSchema = mongoose.Schema({
        time: {
            type: Date,
            default: Date.now
        },

        body: {
            type: String
        },

        played: {
            type: Boolean,
            default: false
        },

        explicit: {
            type: Boolean,
            default: false
        },
        songName:{
          type: String
        },
        songId: {
          type: String
        },
        roomId: {
          type: String,
          required: true
        },
        phoneNumber:{
          type: String
        },
        allData: {
          type: Object
        }
});

module.exports = mongoose.model('Request', requestSchema);
