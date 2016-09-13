'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.json([{jason : jason}]);
});

router.use('/users', require('./UserWebService'));
router.use('/rooms', require('./RoomWebService'));
router.use('/roomMemberships', require('./RoomMembershipWebService'));

module.exports = router;