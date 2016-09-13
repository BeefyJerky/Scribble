'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var RoomMembership = require('../models/roomMembership');

router.get('/user/:userId/room/:roomName', function(req, res, next) {
    Room.findOne({title : req.params.roomName}, function(err, room) {
        if(err) {
            return next(err);
        }
        console.log('room');
        console.log(room);
        
        if(!room) {
            var error = new Error('This room doesn\'t exist');
            error.status = 404;
            return next(err);
        }
        
        if(room.type == 'PRIVATE') {
            
            RoomMembership.findOne({
                userId: req.session.userId,
                roomId: room._id
            }, function(err, roomMembership) {
                if(err) {
                    return next(err);    
                } else if(!roomMembership) {
                    var error = new Error('You don\'t have membership to this room');
                    error.status = 404;
                    return next(error);
                }

                return res.send(roomMembership);
            });
        } else {
            console.log('supp');
            return res.send(room);
        } 
    });
});

module.exports = router;