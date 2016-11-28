import mongoose from 'mongoose';
let Schema       = mongoose.Schema;

var PetSchema   = new Schema({
  id: Number,
  userId: { type: Number, ref: 'User' },
  type: String,
  color: String,
  age: Number
});

module.exports = mongoose.model('Pet', PetSchema);