'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/user/:id', function(req, res, next){
    User.findOne({_id : req.params.id}, function(err, user){
        if(err) {
            return next(err);
        }
        
        res.send(user);
    });
});

router.get('/authorize', function(req, res, next){
    return res.send(req.session.userId);
});

router.post('/register', function(req, res, next){
    if(req.body.email &&
      req.body.username &&
      req.body.firstName &&
      req.body.lastName &&
      req.body.password && 
      req.body.confirmPassword){
        if(req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match!');
            err.status = 400;
            return next(err);
        }
        
        var userData = {
            email: req.body.email,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
        
        User.create(userData, function(err, user) {
            if(err){
                return next(err);
            }
            req.session.userId = user._id;
            res.send(user);
        });
    } else {
        var err = new Error('All fields required');
        err.status = 400;
        return next(err);
     }
});

router.post('/login', function(req, res, next) {
    console.log("logging in");
    if(req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function(error, user){
            if(error || !user) {
                var err = new Error("Wrong email or password!");
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                console.log(req.session.userId);
                console.log(req.session);
                res.send(user);
            }       
        });
    } else {
        var err = new Error('Email and password are required!');
        err.status = 401;
        return next(err);
    }
});

router.get('/logout', function(req, res, next) {
    if(req.session){
        req.session.destroy(function(error) {
            if(error){
                return next(error);
            }
            res.send();
        });
    }
});

module.exports = router;