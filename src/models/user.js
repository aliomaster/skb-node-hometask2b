import mongoose from 'mongoose';
let Schema       = mongoose.Schema;

var UserSchema   = new Schema({
  id: Number,
  username: String,
  fullname: String,
  password: String,
  values: {
    money: String,
    origin: String
  }
});

module.exports = mongoose.model('User', UserSchema);