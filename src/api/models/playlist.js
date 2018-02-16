var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  _id: String,
  etag: String,
  title: String,
  description: String,
  channel: String,
});

//Export model
module.exports = mongoose.model('Playlist', PlaylistSchema);
