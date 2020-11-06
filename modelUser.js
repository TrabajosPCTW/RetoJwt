var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// Role 0 para solo lectura, Role 1 para escritura, Role 2 para lectura y escritura.

var userSchema = new Schema({
  username: String,
  password: String,
  role: Number,
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var usuario = mongoose.model('user', userSchema);

module.exports = usuario;