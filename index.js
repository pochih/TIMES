var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var http = require('http');
var request = require("request");
var child_process = require('child_process');
var fs = require('fs');

var config = require("./config.js");
var parser = require('./parser.js');
var db = require('./db.js');

var Firebase = require("firebase");
var DB = new Firebase(config.FIREBASE_URL);
var USER = DB.child("users");
var LAND = DB.child("lands");
var CENTER = DB.child("center");
var BONUS = DB.child("bonus");
var BOARD = DB.child("boards");
var LAND2BOARD = DB.child("land2board");
//var KINECT = DB.child("kinect");
//var ARDUINO = DB.child("arduino");

var boardOccupy = [[],[],[],[],[]];
var land2board = {};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));



////////// User //////////

// get user's data
app.get('/user/data', function(req, res) {
  USER.child(req.query.user).once("value", function(snapshot) {
    var user = snapshot.val();
    if (user != null) {
      user.lands = parser.parseEmptyArr(user.lands);
      res.send(user);
    }
    else {
      var db = require('./db.js');
      res.send(db.defaultUser);
    }
  });
});

// get dead user's data
app.get('/user/dead', function(req, res) {
  USER.child(req.query.user).once("value", function(snapshot) {
    var user = snapshot.val();
    if (user != null) {
      res.send(user.dead);
    }
    else {
      var db = require('./db.js');
      res.send(db.defaultUser.dead);
    }
  });
});

// init users
app.get('/user/init', function(req, res) {
  var userdb = db.user;
  var user = parser.initUser(userdb, req.query);

  USER.child(user._id).set(user);
  res.send('<h1 style="color:blue;">Add User:</h1><h3 style="color:purple;">' + user._id + ' (' + user.name + ')' + '</h3><h1 style="color:blue;">Succeed!!</h1>')
});

// delete users
app.get('/user/delete', function(req, res) {
  var user = req.query.user;

  USER.child(user).remove();
  res.send('<h1 style="color:red;">Delete User:</h1><h3 style="color:purple;">' + user + '</h3><h1 style="color:red;">Succeed!!</h1>')
});



////////// Land /////////

// get land's data
app.get('/land/data', function(req, res) {
  var land = req.query.land;
  if (land == 'all') {
    LAND.once("value", function(snapshot) {
      res.send(snapshot.val());
    });
  }
  else {
    LAND.child(req.query.land).once("value", function(snapshot) {
      if (snapshot.val() == null)
        res.send('<h1 style="color:red;">Land:</h1>' + req.query.land + '<h1 style="color:red;">doesn\'t exist!</h1>');
      else
        res.send(snapshot.val());
    });
  }
});

// user buy a land
app.get('/land/buy', function(req, res) {
  var user = req.query.user;
  var land = parser.parseLandType(req.query.land);

  // user buy a land

  // if fail
  //res.send({success: false});

  // if succeed
    //扣錢
  var fbRef = USER.child(user).child("lands").child(land.longType);
  fbRef.once("value", function(snapshot) {
    var landIDs = [];
    if (snapshot.val() != null)
      landIDs = snapshot.val();
    if (landIDs.length == 1 && landIDs[0] == -1)
      landIDs = [];
    if (landIDs.indexOf(land.num) < 0)
      landIDs.push(land.num);
    fbRef.set(landIDs);

    // renew occupy
    LAND2BOARD.once("value", function(snapshot) {
      var board = snapshot.val()[req.query.land].board;
      var position = snapshot.val()[req.query.land].position;
      boardOccupy[board][position] = 1;
      BOARD.child(board).child("occupy").once("value", function(snapshot) {
        var occupy = snapshot.val();
        occupy[position] = 1;
        BOARD.child(board).child("occupy").set(occupy);
      });
    });
  });

  var result = '<h1 style="color:red;">User:</h1>' + user + '<h1 style="color:blue;">buy land:</h1>' + land.longType + land.num;
  res.send(result);
});

// user stand on a land
app.get('/land/stand', function(req, res) {
  var user = req.query.user;
  var land = parser.parseLandType(req.query.land);

  // user stand on land


  var result = '<h1 style="color:red;">User:</h1>' + user + '<h1 style="color:blue;">stands on land:</h1>' + land.type + land.num;
  res.send(result);
});

app.get('/land/importance', function(req, res) {
  var land = req.query.land;

  // count land's importance


  var result = '<h1 style="color:blue;">land:</h1>' + land;
  res.send(result);
});

// init lands
app.get('/land/init', function(req, res) {
  var db = require('./db.js');
  for (var i = 0; i < db.lands.entertainment.length; i++)
    LAND.child(db.lands.entertainment[i]._id).set(db.lands.entertainment[i]);
  for (var i = 0; i < db.lands.health.length; i++)
    LAND.child(db.lands.health[i]._id).set(db.lands.health[i]);
  for (var i = 0; i < db.lands.affection.length; i++)
    LAND.child(db.lands.affection[i]._id).set(db.lands.affection[i]);
  for (var i = 0; i < db.lands.career.length; i++)
    LAND.child(db.lands.career[i]._id).set(db.lands.career[i]);
  for (var i = 0; i < db.lands.learning.length; i++)
    LAND.child(db.lands.learning[i]._id).set(db.lands.learning[i]);
  var result = '<h1 style="color:pink;">Init lands succeed!</h1>';
  res.send(result);
});



///////// board ////////

// initial board
// http://localhost:5000/board/init?board=2&land=a10,b9,c3,c1,c4,a5,e3,e4,d3,d18,d4,c2,b5,b6,b4,b3,b1,b2,b17,a11
app.get('/board/init', function(req, res) {
  var boardNum = req.query.board;

  if (boardNum == 'all') {
    var boards = db.boards;

    // save land into board
    for (var index = 0; index < boards.length; index++) {
      var landArr = boards[index];
      var landIDs = [];
      for (var i = 0; i < landArr.length; i++) {
        landIDs.push(landArr[i]);
        boardOccupy[index][i] = 0;
  
        // set land2board dictionary
        var key = landArr[i];
        land2board[key] = {};
        land2board[key].board = index;
        land2board[key].position = i;
      }
      //console.log("Occupy " + index + '\n' + boardOccupy[index]);
      LAND2BOARD.set(land2board);
      BOARD.child(index).child("lands").set(landIDs);
      BOARD.child(index).child("occupy").set(boardOccupy[index]);
    }

    var result = '<h1 style="color:blue;">Add all lands to boards</h1>';
    res.send(result);
  }
  else {
    var landArr = parser.parseLands(req.query.land);

    // save land into board
    var landIDs = [];
    for (var i = 0; i < landArr.length; i++) {
      landIDs.push(landArr[i]);
      boardOccupy[boardNum][i] = 0;

      // set land2board dictionary
      var key = landArr[i];
      land2board[key] = {};
      land2board[key].board = (boardNum-0);
      land2board[key].position = i;
    }
    //console.log("Occupy " + boardNum + '\n' + boardOccupy[boardNum]);
    LAND2BOARD.set(land2board);
    BOARD.child(boardNum).child("lands").set(landIDs);
    BOARD.child(boardNum).child("occupy").set(boardOccupy[boardNum]);
  
    var result = '<h1 style="color:blue;">Add lands:</h1>' + landArr + '<h1 style="color:blue;">to Board:</h1>' + boardNum;
    res.send(result);
  }
});

// get occupy info. of board
app.get('/board/occupy', function(req, res) {
  var boardNum = req.query.board;

  // get board info
  BOARD.child(boardNum).child("occupy").once("value", function(snapshot) {
    res.send(snapshot.val());
  });
});



//////// global data /////////

// get data center
app.get('/center', function(req, res) {
  var db = require('./db.js');
  res.send(db.center);
  CENTER.set(db.center);
});

// get configs
app.get('/bonus', function(req, res) {
  var db = require('./db.js');
  res.send(db.bonus);
  BONUS.set(db.bonus);
});

// root
app.get('/', function(req, res) {
  var result = '<title>Art Festival</title><h1 style="color:green;">Welcome to Art Festival</h1>';
  var times = config.TIMES || 5;
  for (i = 0; i < times; i++)
    result += ('<p>' + cool() + '</p>');
  res.send(result);
});

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
          //var childProcess = require('child_process').fork('./lifewall.exe');
        }
      })
    }
    else {
      console.log(error);
    }
  });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
