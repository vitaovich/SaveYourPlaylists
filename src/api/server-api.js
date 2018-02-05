var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var apiServer = express();
var config = require('./config');
var PlaylistService = require('./playlist.service');
var UserService = require('./user.service');

// parse application/x-www-form-urlencoded
apiServer.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
apiServer.use(bodyParser.json());
apiServer.use(cors());

var router = express.Router();

router.get('/', function (req, res) {
  res.send('Welcome to SYP API!');
});

const pService = PlaylistService;
router.get('/playlists/:id', pService.get);
router.get('/playlists', pService.getAll);
router.post('/playlists', pService.post);
router.put('/playlists/:id', pService.put);
router.delete('/playlists/:id', pService.delete);

const userService = UserService;
router.post('/users', userService.post);
router.get('/users', userService.getAll);
router.get('/users/:id', userService.get);

apiServer.use('/api', router);

apiServer.listen(config.port, function() {
  console.log('SYP api server listening on port ' + config.port);
});

// Set up mongoose connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoDB = config.dbPath;
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
