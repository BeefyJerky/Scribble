var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.objectId,
        ref: 'User',
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String
    }
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
