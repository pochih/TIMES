var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var http = require('http');
var request = require("request");
var child_process = require('child_process');
var fs = require('fs');

var config = require("./config.js");
var parser = require('./parser.js');

var Firebase = require("firebase");
var DB = new Firebase(config.FIREBASE_URL);
var USER = DB.child("users");
var LAND = DB.child("lands");
var CENTER = DB.child("center");
var CONFIGS = DB.child("configs");
var BOARD = DB.child("boards");
var KINECT = DB.child("kinect");
var ARDUINO = DB.child("arduino");

var boardOccupy = [[],[],[],[],[]];

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/readFile', function(req, res) {
  var user = req.query.user;
  console.log("Dead User: " + req.query.user);
  
  // HTTP GET
  var pathname = "https://art-festival.herokuapp.com/user/dead?user=" + user;
  request({
    url: pathname,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
      // create file
      fs.writeFile('result.txt', JSON.stringify(body, null, 4), function(err) {
        if (err)
          console.log(err);
        else {
          console.log("Create file succeed.");
          // execute kinect
          // var child = child_process.fork('./lifewall.exe');
        }
      })
    }
    else {
      console.log(error);
    }
  });
});

// get dead user's data
app.get('/user/dead', function(req, res) {
  //console.log("dead user: " + req.query.user);
  var db = require('./db.js');
  res.send(db.a);
  //USER.child(req.query.user).set(db.a);
});

// get user's data
app.get('/user/data', function(req, res) {
  var db = require('./db.js');
  res.send(db.a);
  USER.child(req.query.user).set(db.a);
});

// get land's data
app.get('/land/data', function(req, res) {
  var db = require('./db.js');
  res.send(db.b);
  LAND.child(req.query.land).set(db.b);
});

// get data center
app.get('/center', function(req, res) {
  var db = require('./db.js');
  res.send(db.c);
  CENTER.set(db.c);
});

// get configs
app.get('/configs', function(req, res) {
  var db = require('./db.js');
  res.send(db.d);
  CONFIGS.set(db.d);
});

// initial board
// http://localhost:5000/board/init?board=2&land=a10,b9,c3,c1,c4,a5,e3,e4,d3,d18,d4,c2,b5,b6,b4,b3,b1,b2,b17,a11
app.get('/board/init', function(req, res) {
  var boardNum = req.query.board;
  var landArr = parser.parseLands(req.query.land);

  // save land into board
  BOARD.child(boardNum).once("value", function(snapshot) {
    var landIDs = [];
    if (snapshot.val() != null) {
      landIDs = snapshot.val();
    }
    for (var i = 0; i < landArr.length; i++) {
      if (landIDs.indexOf(landArr[i]) < 0) {
        landIDs.push(landArr[i]);
        boardOccupy[boardNum][landIDs.length-1] = 0;
      }
    }
    //console.log("Occupy " + boardNum + '\n' + boardOccupy[boardNum]);
    BOARD.child(boardNum).child("lands").set(landIDs);
    BOARD.child(boardNum).child("occupy").set(boardOccupy[boardNum]);
  });

  var result = '<h1 style="color:blue;">Add lands:</h1>' + landArr + '<h1 style="color:blue;">to Board:</h1>' + boardNum;
  res.send(result);
});

// get occupy info. of board
app.get('/board/occupy', function(req, res) {
  var boardNum = req.query.board;

  // get board info
  BOARD.child(boardNum).child("occupy").once("value", function(snapshot) {
    res.send(snapshot.val());
  });
});

// user stand on a land
app.get('/land/stand', function(req, res) {
  var user = req.query.user;
  var land = parser.parseLandType(req.query.land);

  // user stand on land


  var result = '<h1 style="color:red;">User:</h1>' + user + '<h1 style="color:blue;">stands on land:</h1>' + land.type + land.num;
  res.send(result);
});

// user buy a land
app.get('/land/buy', function(req, res) {
  var user = req.query.user;
  var land = parser.parseLandType(req.query.land);

  // user buy a land
  // if succeed
  var fbRef = USER.child(user).child("lands").child(land.longType);
  fbRef.once("value", function(snapshot) {
    var landIDs = [];
    if (snapshot.val() != null)
      landIDs = snapshot.val();
    if (landIDs.indexOf(land.num) < 0)
      landIDs.push(land.num);
    fbRef.set(landIDs);
  });

  var result = '<h1 style="color:red;">User:</h1>' + user + '<h1 style="color:blue;">buy land:</h1>' + land.longType + land.num;
  res.send(result);
});

app.get('/land/importance', function(req, res) {
  var land = req.query.land;

  // count land's importance


  var result = '<h1 style="color:blue;">land:</h1>' + land;
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
