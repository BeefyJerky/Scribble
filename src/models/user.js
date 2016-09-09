var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.statics.authenticate = function(email, password, cb) {
    User.findOne({email: email}).exec(function (error, user) {
        if(error) {
            return cb(error);
        } else if(!user) {
            var err = new Error('User not found');
            err.status = 401;
            return cb(err);
        }
        
        if(password === user.password){
            return cb(null, user);
        } else {
            return cb();
        }
    });
}

/*
UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err) {
            return next(err);
        }
        
        user.password = hash;
        next();
    })
});
*/

var User = mongoose.model('User', UserSchema);
module.exports = User;
