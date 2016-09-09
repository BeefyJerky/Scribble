var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['PUBLIC', 'PRIVATE'],
        required: true
    }
});

var Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
