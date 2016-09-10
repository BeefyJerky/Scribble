'use strict';

var User = require('./models/user.js');
var Room = require('./models/room.js');

var user1 = {
    email: "xujasonxu@live.com",
    username: "AsianBeanz",
    firstName: "Jason",
    lastName: "Xu",
    password: "password"
}

 User.findOne({'email' : user1.email}, function(error, admin) {
    if(!error && !admin) {
        User.create(user1);
    } 
});

var user2 = {
    email: "dongxiaoli1996@gmail.com",
    username: "UberTurtleZ",
    firstName: "Donny",
    lastName: "Li",
    password: "password"
}

 User.findOne({'email' : user2.email}, function(error, admin) {
    if(!error && !admin) {
        User.create(user2);
    } ;
});