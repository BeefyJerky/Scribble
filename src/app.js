'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

var http = require('http').Server(app);
var io = require('./socket.js').listen(http);

mongoose.connect("mongodb://localhost:27017/onlineClassroom");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

app.use(session({
  secret: 'treehouse loves you',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var router = require('./api');
app.use('/', express.static('public'));

app.use('/api', router);

app.use(function(req, res, next) {
/*
    var err = new Error('File Not Found');
    err.status = 404;
    console.error(err);
*/
});

// error handler
// define as the last app.use callback
/*
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

require('./seed');

/*app.listen(3000, function() {
    console.log("Server is running on port 3000!");
});*/

http.listen(3000, function(){
  console.log('listening on *:3000');
});
