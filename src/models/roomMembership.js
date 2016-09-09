var mongoose = require('mongoose');

var RoomMembershipSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room',
        required: true
    }
});

var RoomMembership = mongoose.model('RoomMembership', RoomMembershipSchema);
module.exports = RoomMembership;
