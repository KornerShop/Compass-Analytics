const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) { return next(); }
  this.password = this.encryptPassword(this.password);
  return next();
})

UserSchema.methods = {
  authenticate(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  encryptPassword(plainTextPword) {
    if (!plainTextPword) {
      return ''
    }
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPword, salt);
  }
};


module.exports = mongoose.model('user', UserSchema);
