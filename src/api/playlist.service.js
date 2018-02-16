var Playlist = require('./models/playlist');
var config = require('./config');

this.get = function (req, res) {
  console.log('Get playlist: ' + req.params.id );
  Playlist.findOne({ _id: req.params.id })
  .exec(function ( err, playlist ) {
      if ( err ) return handleError( err, res );
      console.log(playlist);
      res.send( playlist );
  });
};

this.getByChannel = function (req, res) {
  console.log('Getting all channels playlist');
  const channelId = req.params.id;
  Playlist.find({ channel: channelId }, (err, docs) => {
    if(docs) {
      res.json(docs);
    }
    else {
      res.sendStatus(404);
    }
  });
};

this.getAll = function (req, res) {
  console.log('Get all playlists.');
  Playlist.find({})
  .limit(100) // TODO: find better alternative other than hard coding limit
  .exec( function(err, playlists) {
    if ( err ) return handleError( err, res );
    res.send( playlists );
  });
};

this.post = function (req, res) {
  console.log('Post a playlist.');
  const playlist = new Playlist(req.body);
  // console.log(playlist);
  playlist.save( error => {
    if(error) {
      // console.log('ERROR OCCURED');
      // console.log(error);
      return res.status(200).json({success: false, message: 'Playlist already exists', playlist: playlist});
    }
    res.json({success: true, playlist: playlist});
  });
};

this.put = function(req, res) {
  var id = req.params.id;
  console.log( 'Put playlist: ' + req.params.id );
  const playlist = new Playlist(req.body);
  Playlist.findByIdAndUpdate(id, playlist, { new: true }, (err, playlist) => {
        // if ( err ) return handleError( err, res );
        res.json(playlist);
  });
};

this.delete = function(req, res) {
  console.log( 'Delete playlist: ' + req.params.id );
  Playlist.findByIdAndRemove( req.params.id, function (err, playlist) {
    if ( err ) return handleError( err, res );
    res.send(playlist);
  });
};

function handleError(err, res) {
  res.sendStatus(404);
  console.log('\n\nFound error\n\n');
  console.log(err);
};
