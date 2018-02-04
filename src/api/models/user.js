var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    sub: {type: String, unique: true},
    email: String,
    name: String,
    given_name: String,
    picture: String,
  });

//Export model
module.exports = mongoose.model('User', UserSchema);
