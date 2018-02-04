var User = require('./models/user');
var config = require('./config');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '379911385768-enee68tbs2v1fg4l2g7rr9hdh03shfc1.apps.googleusercontent.com';
var gapiClient = new OAuth2Client(CLIENT_ID, '', '');

this.get = function (req, res) {
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
  console.log(req.body);
  const id_token = req.body.idtoken;
  gapiClient.verifyIdToken({idToken: id_token, audience:CLIENT_ID}).then(verifyGoogleLogin);
  res.sendStatus(200);
};

function verifyGoogleLogin(login) {
  const payload = login.getPayload();
  const userid = payload['sub'];
  const newUser = {sub: payload['sub'],
                email: payload['email'],
                name: payload['name'],
                given_name: payload['given_name'],
                picture: payload['picture']}
  const user = new User(newUser);
  user.save(err => {console.log(err);})
};

this.put = function(req, res) {
};

this.delete = function(req, res) {
};

function handleError(err, res) {
  res.sendStatus(404);
  console.log('\n\nFound error\n\n');
  console.log(err);
};
