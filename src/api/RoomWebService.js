'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var RoomMembership = require('../models/roomMembership');

router.get('/:id', function(req, res, next) {
    Room.findOne({_id : req.params.id}, function(err, room){
        if(err) {
            return next(err);
        }
        
        res.send(room);
    });
});

router.get('/type/:type', function(req, res, next) {
    Room.find({type : req.params.type}, function(err, room){
        if(err) {
            return next(err);
        }
        
        res.send(room);
    });
});

router.get('/name/:name', function(req, res, next) {
    Room.findOne({title : req.params.name}, function(err, room){
        if(err) {
            return next(err);
        } else if(!room) {
            var err = new Error('No room found');
            err.status = 404;
            return next(err);          
        }
        
        res.send(room);
    });
});

router.get('/filter/search', function(req, res, next) {
    var filter = {};
    
    if(req.query.type) {
        filter.type = req.query.type;
    }
    
    if(!req.query.name) {
        req.query.name = "";
    }
    
    filter.title = {$regex : req.query.name, $options: 'i'};
    
    Room.find(filter, function(err, rooms) {
        if(err) {
            return next(err);
        }
        
        res.send(rooms);
    });
});

router.post('/', function(req, res, next) {
    if(req.body.createdBy &&
      req.body.title &&
      req.body.description &&
      req.body.type){
        
        var roomData = {
            createdBy: req.body.createdBy,
            title: req.body.title,
            description: req.body.description,
            type: req.body.type
        };
        
        Room.create(roomData, function(err, room) {
            if(room.type == 'PRIVATE') {
                var roomMembershipData = {
                    userId: req.session.userId,
                    roomId: room._id
                };
                
                RoomMembership.create(roomMembershipData);
            }
            res.send(room);
        });
    } else {
        var err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});
module.exports = router;