const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''                      // "user.js" is unused currently, this would be part of implementing bcrypt down the line.
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
userType: {
  type: String,
  default: ''
},

  signUpDate: {
    type: Date,
    default: Date.now()
  }
});
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);