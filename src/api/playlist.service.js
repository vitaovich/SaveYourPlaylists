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
  console.log(req.body);
  const playlists = req.body.map((playlist) => {
    let pl = new Playlist(playlist);
  });
  Playlist.insertMany(playlists, (error, docs) => {console.log(error)});
  res.send(playlists);
};

this.put = function(req, res) {
  var id = req.params.id;
  console.log( 'Put playlist: ' + req.params.id );
  Playlist.findByIdAndUpdate(id, req.body, { new: true }, (err, playlist) => {
        if ( err ) return handleError( err, res );
        res.send(playlist);
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
