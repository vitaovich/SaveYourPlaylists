var User = require('./models/user');
var config = require('./config');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '379911385768-enee68tbs2v1fg4l2g7rr9hdh03shfc1.apps.googleusercontent.com';
var gapiClient = new OAuth2Client(CLIENT_ID, '', '');

this.get = function (req, res) {
  console.log('Get user: ' + req.params.id );
  User.findOne({ _id: req.params.id })
  .exec(function ( err, user ) {
      if ( err ) return handleError( err, res );
      console.log(user);
      res.json(user);
  });
};

this.getAll = function (req, res) {
  console.log('Get all playlists.');
  User.find({})
  .limit(100) // TODO: find better alternative other than hard coding limit
  .exec( function(err, playlists) {
    if ( err ) return handleError( err, res );
    res.send( playlists );
  });
};

this.post = function (req, res) {
  console.log('Post user.');
  // console.log(req.body);
  const id_token = req.body.idtoken;
  gapiClient.verifyIdToken({idToken: id_token, audience:CLIENT_ID})
  .then(login => {
    const payload = login.getPayload();
    const newUser = {_id: payload['sub'],
                  email: payload['email'],
                  name: payload['name'],
                  given_name: payload['given_name'],
                  picture: payload['picture']};

    const user = new User(newUser);
    console.log(user);
    user.save( error => {
      if(error) {
        // console.log('ERROR OCCURED');
        // console.log(error);
        return res.status(200).json({success: false, message: 'User already exists', user: user});
      }
      res.json({success: true, user: user});
    });
  });
};

this.put = function(req, res) {
  console.log('Put user');
  console.log(req.params);
  console.log(req.body);
  const id = req.params.id;
  const user = new User(req.body);
  User.findByIdAndUpdate(id, user, (err, doc) => {
    console.log(err);
    console.log(doc);
  });
  res.sendStatus(200);
  // const user = new User(req.body.user);
};

this.delete = function(req, res) {
};

function handleError(err, res) {
  res.sendStatus(404);
  console.log('\n\nFound error\n\n');
  console.log(err);
};
