var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: String,
    email: String,
    name: String,
    given_name: String,
    picture: String,
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }]
  });

//Export model
module.exports = mongoose.model('User', UserSchema);
