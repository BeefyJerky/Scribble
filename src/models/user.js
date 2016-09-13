var mongoose = require('mongoose');
var crypto = require('crypto');

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

    var hash = crypto.createHash('md5').update(password).digest('hex');
    console.log(hash);
    User.findOne({email: email}).exec(function (error, user) {
        
        if(error) {
            return cb(error);
        } else if(!user) {
            var err = new Error('User not found');
            err.status = 401;
            return cb(err);
        }
        
        if(hash === user.password){
            return cb(null, user);
        } else {
            return cb();
        }
    });
}

UserSchema.pre('save', function(next) {
    var user = this;
    var hash = crypto.createHash('md5').update(user.password).digest('hex');

    user.password = hash;
    console.log(hash);
    next();
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
