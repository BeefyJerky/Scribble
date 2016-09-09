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
    email: "xujasonxu@outlook.com",
    username: "MonkeyBeanz",
    firstName: "Jason",
    lastName: "Xu",
    password: "password"
}

 User.findOne({'email' : user2.email}, function(error, admin) {
    if(!error && !admin) {
        User.create(user2);
    } ;
});
        
var room = {
    createdBy: user1._id,
    title: "Default",
    description: "Test Room",
    type: "PUBLIC"
}

 Room.findOne({'_id' : room._id}, function(error, theRoom) {
    if(!error && !theRoom) {
        Room.create(room);
    } ;
});
