var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    _id: String,
    etag: String,
    title: String,
    description: String,
  });

//Export model
module.exports = mongoose.model('Video', VideoSchema);
