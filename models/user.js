const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
});

userSchema.methods.checkRepeat = function(email) {
  User.findOne({email: email}, function(err, user) {
    if(user) {
      return true;
    } else {
      return false;
    }
  });
}

userSchema.methods.encrypt = function() {
  const password = this.password;
  bcrypt.hash(password, null, null, function(err, hash) {
    this.password = hash;
    console.log(this.password);
  });
}

userSchema.methods.decrypt = function(password) {
  bcrypt.compare(password, this.password, function(err, cracked) {
    if(cracked == true) {
      return true;
      console.log("password cracked");
    }
    else if(cracked == false) {
      return false;
      console.log("your password is wrong");
    }
  });
}

const User = mongoose.model('User', userSchema);

exports.create = function(email, password) {
  const newUser = new User({
    email: email,
    password: password
  });
  const repeat = newUser.checkRepeat();
  if(!repeat) {
    newUser.encrypt();
    newUser.save();
    return true;
  } else {
    return false;
  }
}

exports.login = function(email, password) {
  const promise = User.findOne({email: email});
  return promise;
}

exports.findOne = function(email) {
  const promise = User.findOne({email: email});
  return promise;
}
