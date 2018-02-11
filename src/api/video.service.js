var Video = require('./models/video');

this.get = function (req, res) {
  console.log('Get video: ' + req.params.id );
  Video.findOne({ _id: req.params.id })
  .exec(function ( err, video ) {
      if ( err ) return handleError( err, res );
      console.log(video);
      res.send( video );
  });
};

this.getAll = function (req, res) {
  console.log('Get all videos.');
  Video.find({})
  .limit(100) // TODO: find better alternative other than hard coding limit
  .exec( function(err, videos) {
    if ( err ) return handleError( err, res );
    res.send( videos );
  });
};

this.post = function (req, res) {
  console.log('Post a video.');
  const video = new Video(req.body);
  video.save( error => {
    if(error) {
      console.log(error);
      return res.status(200).json({success: false, message: 'Video already exists', video: video});
    }
    res.json({success: true, video: video});
  });
};

function handleError(err, res) {
  res.sendStatus(404);
  console.log('\n\nFound error\n\n');
  console.log(err);
};
