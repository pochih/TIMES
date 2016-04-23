var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var http = require('http');
var request = require("request");
var child_process = require('child_process');
var Firebase = require("firebase");
var config = require("./config.js");
var DB = new Firebase(config.FIREBASE_URL);
var USER = DB.child("users");
var LAND = DB.child("lands");
var CENTER = DB.child("center");
var CONFIG = DB.child("configs");
var BOARD = DB.child("boards");
var KINECT = DB.child("kinect");
var ARDUINO = DB.child("arduino");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/get/user/:uid', function(req, res) {
  var user = require('./db.js');
  res.send(user.a);
  USER.child(req.params.uid).set(user.a);
});

app.get('/get/land/:lid', function(req, res) {
  var user = require('./db.js');
  res.send(user.b);
  LAND.child(req.params.lid).set(user.b);
});

app.get('/get/center/:target', function(req, res) {
  var user = require('./db.js');
  res.send(user.c);
  CENTER.set(user.c);
});

app.get('/get/config', function(req, res) {
  var user = require('./db.js');
  res.send(user.d);
  CONFIG.set(user.d);
});

app.get('/init', function(req, res) {
  
});

app.get('/init/board/:boardID/:landID', function(req, res) {
  var board = req.params.boardID;
  var land = req.params.landID;
  // save land into board
  BOARD.child(board).once("value", function(snapshot) {
    var landIDs = [];
    if (snapshot.val() != null) {
      landIDs = snapshot.val();
    }
    if (landIDs.indexOf(land) < 0) {
      landIDs.push(land);
      BOARD.child(board).set(landIDs);
    }
  });

  var result = '<h1 style="color:blue;">Board:</h1>' + board + '<h1 style="color:blue;">land:</h1>' + land;
  res.send(result);
});

app.get('/occupy/board/:boardID', function(req, res) {
  var board = req.params.boardID;
  // get board info
  BOARD.child(board).once("value", function(snapshot) {
    var landIDs = snapshot.val();
    var occupy = [];
    // get land info
    res.send(occupy);
  });
});

app.get('/stand/:userID/:landID', function(req, res) {
  var user = req.params.userID;
  var land = req.params.landID;
  // user stand on land
  var result = '<h1 style="color:red;">User:</h1>' + user + '<h1 style="color:blue;">stands on land:</h1>' + land;
  res.send(result);
});

app.get('/', function(req, res) {
  var result = '<h1 style="color:green;">Welcome to Art Festival</h1>';
  var times = config.TIMES || 5;
  for (i = 0; i < times; i++)
    result += ('<p>' + cool() + '</p>');
  res.send(result);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
