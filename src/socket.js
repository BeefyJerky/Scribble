'use strict';
var socketIO = require('socket.io');
var User = require('./models/user.js');
var Message = require('./models/message.js');
var Room = require('./models/message.js');

module.exports.listen = function(http){
    var io = socketIO.listen(http);
    
    var clients = {};
    io.on('connection', function(socket){
        
        socket.on('join', function(data){
            
            
            if(socket.room && data.room != socket.room) {
                socket.leave(socket.room);
            }
            
            socket.room = data.room;
            socket.join(socket.room);
            clients[data.userId] = socket.room;
            console.log(socket.room);
            User.findOne({_id: data.userId}, function(error, user) {
                socket.user = {id: user._Id, username: user.username};
                socket.emit('message', 
                            {message: "You are connected"});
                socket.broadcast.to(socket.room)
                    .emit('message', 
                        {message:  socket.user.username + " has joined", 
                        user: "you"});                
            });
        });
                
        socket.on('disconnect', function() {
            socket.broadcast.to(socket.room).emit('message', {message:  socket.user.username + " has left"});                
            socket.leave(socket.room);
            socket.room = "";
            clients[socket.user.id] = socket.room;
        });
        
        socket.on('message', function(msg){
            console.log(msg);
            console.log(socket.room);
            
            socket.broadcast.to(socket.room).emit('message', {message: msg.message, username: socket.user.username});
            socket.emit('message', {message: msg.message, username: "you"})
        });
    });
}