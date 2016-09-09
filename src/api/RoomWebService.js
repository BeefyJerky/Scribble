'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');

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
            res.send(room);
        });
    } else {
        var err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});
module.exports = router;