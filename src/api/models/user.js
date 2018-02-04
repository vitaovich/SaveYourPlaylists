var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    etag: String,
    youtubeId: {type: String, unique: true},
    title: String,
    description: String,
  });

//Export model
module.exports = mongoose.model('User', UserSchema);
