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
var USERTIME = DB.child("usertimes");
var LAND = DB.child("lands");
var CENTER = DB.child("center");
var BONUS = DB.child("bonus");
var BOARD = DB.child("boards");
var LAND2BOARD = DB.child("land2board");
//var KINECT = DB.child("kinect");
//var ARDUINO = DB.child("arduino");

var boardOccupy = [[],[],[],[],[]];
var land2board = {};

// for time
var childProcess;
var childNum = 0;
var center = {
  status: 'pause',
  speed: 1
};
var startTime;
var counter = 0;
var interval = 3;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



////////// User ////////////

// get user's data
app.get('/user/data', function(req, res) {
  if (req.query.user == 'all') {
    USERTIME.once("value", function(usertimeData) {
      USER.once("value", function(snapshot) {
        var usertime = usertimeData.val();
        var users = snapshot.val();
        for (var user in users) {
          var timeObj = {
            hours: usertime[user].hours,
            mins: usertime[user].mins,
            secs: usertime[user].secs,
            milliseconds: 0
          }
          users[user].timeLeft.hours = timeObj;
          USER.child(user).child('timeLeft').set(timeObj);
        }
        console.log(" [O] /user/data?user=all");
        res.send(users);
      });
    });
  }
  else {
    USERTIME.child(req.query.user).once("value", function(timeLeft) {
      var time = timeLeft.val();
      USER.child(req.query.user).once("value", function(snapshot) {
        var user = snapshot.val();
        if (user != null) {
          user.timeLeft.hours = time.hours;
          user.timeLeft.mins = time.mins;
          user.timeLeft.secs = time.secs;
          user.lands = parser.parseEmptyArr(user.lands);
          USER.child(req.query.user).child('timeLeft').set(user.timeLeft);
          res.send(user);
        }
        else {
          var db = require('./db.js');
          res.send(db.defaultUser);
        }
      });
    });
  }
});

// get dead user's time
app.get('/user/time', function(req, res) {
  USERTIME.child(req.query.user).once("value", function(snapshot) {
    var time = snapshot.val();
    if (time != null) {
      res.send(time);
    }
    else {
      res.send('<h1 style="color:#12bbf0;">No such User:</h1><h2 style="color:#f87373;">' + req.query.user + '</h2>');
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
  var db = require('./db.js');
  var userdb = db.user;
  var user = parser.initUser(userdb, req.query);
  // if ((req.query.id) == '0')
  //   user.timeLeft.hours = 40000;
  USER.child(user._id).set(user);

  var tmp = user.timeLeft;
  tmp.interest = user.interest;
  console.log(JSON.stringify(tmp));
  USERTIME.child(user._id).set(tmp);
  res.send('<h1 style="color:blue;">Add User:</h1><h3 style="color:purple;">' + user._id + ' (' + user.name + ')' + '</h3><h1 style="color:#bb4477;">Succeed!!</h1>')
});

// init users
app.get('/user/init/all', function(req, res) {
  var users = db.allUserURL;
  for (var i = 0; i < users.length; i++) {
    var pathname = users[i];
    request({
      url: pathname,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {}
    });
  }

  res.send('<h1 style="color:#42b48e;">Init all users:</h1><h1 style="color:#d4ac0d;">Succeed!!</h1>')
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
      console.log(" [O] /land/data?land=all");
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
  var money = parseInt(req.query.money);

  // user buy a land

  USER.child(user).once("value", function(userdata){
    var userData = userdata.val();
    LAND.child(req.query.land).once("value", function(landdata) {
      var landData = landdata.val();
      var buyMsg = parser.buyLand(userData, landData, money, land);
      if (buyMsg.success) {
        // if succeed
        console.log(" [O] /land/buy?user=" + user + '&target=' + buyMsg.targetID);

        // 土地要新增owner
        var ownerObj = {
          _id: userData['_id'],
          name: userData['name']
        };
        LAND.child(req.query.land).child("owner").set(ownerObj);

        // user 下新增土地, 加利息, 扣錢
        // user 新增土地
        var userLand = userData.lands[land.longType];
        var landIDs = [];
        if (userLand != null)
          landIDs = userLand;
        if (landIDs.length == 1 && landIDs[0] == -1)
          landIDs = [];
        if (landIDs.indexOf(land.num) < 0)
          landIDs.push(land.num);
        userData.lands[land.longType] = landIDs;

        // user 加利息
        userData.interest = parser.countInterest(userData.lands);
        console.log("   user: %s, interest: %s", userData._id, userData.interest);

        USERTIME.child(user).once("value", function(usertimeData) {
          var usertime = usertimeData.val();

          // user 扣錢
          usertime = parser.countTime(usertime, money);
          usertime.interest = userData.interest;
          userData.timeLeft.hours = usertime.hours;
          userData.timeLeft.mins = usertime.mins;
          userData.timeLeft.secs = usertime.secs;

          // 更新 Firebase 資料
          USER.child(user).set(userData);
          USERTIME.child(user).set(usertime);
        })

        // 被搶者失去土地, 扣利息
        if (buyMsg.targetID != null) {
          var targetRef = USER.child(buyMsg.targetID);
          targetRef.once("value", function(targetdata){
            var target = targetdata.val();
            var tmpLand = target.lands[land.longType];
            var index = tmpLand.indexOf(land.num);
            if (index > -1) {
              tmpLand.splice(index, 1);
              if (tmpLand.length == 0)
                tmpLand = [-1];
            }
            target.lands[land.longType] = tmpLand;
            target.interest = parser.countInterest(target.lands);
            USERTIME.child(buyMsg.targetID).child('interest').set(target.interest);
            console.log("   target: %s, interest: %s", target._id, target.interest);
            targetRef.set(target);
          });
        }

        // renew BOARD's occupy
        LAND2BOARD.once("value", function(snapshot) {
          var board = snapshot.val()[req.query.land].board;
          var position = snapshot.val()[req.query.land].position;
          boardOccupy[board][position] = 1;
          BOARD.child(board).child("occupy").once("value", function(snapshot) {
            var occupy = snapshot.val();
            occupy[position] = 1;
            BOARD.child(board).child("occupy").set(occupy);
            res.status(200).send(buyMsg);
          });
        });
      }
      else {
        // if failed

        // 買失敗 扣錢
        if (buyMsg.message == '沒拿到成就，怒！ ヽ(`Д´)ﾉ ヽ(`Д´)ﾉ ヽ(`Д´)ﾉ') {
          // user 扣錢
          userData.timeLeft = parser.countTime(userData.timeLeft, money);
          var timeObj = userData.timeLeft;
          timeObj.interest = userData.interest;
          USERTIME.child(user).set(timeObj);
          USER.child(user).set(userData);
        }

        res.status(400).send(buyMsg);
      }
    })
  })

  // var result = '<h1 style="color:red;">User:</h1>' + user + '<h1 style="color:blue;">buy land:</h1>' + land.longType + land.num;
  // res.send(result);
});

// user stand on a land
app.get('/land/stand', function(req, res) {
  var user = req.query.user;
  var land = parser.parseLandType(req.query.land);

  // if illegal land
  if (parser.illegalLand(land))
    res.send('這個土地不存在啦 ｡゜(｀Д´)゜｡ ');

  // user stand on land
  USER.child(user).child('stand').set(req.query.land);

  var result = '<h1 style="color:red;">User:</h1>' + user + '<h1 style="color:blue;">stands on land:</h1>' + land.longType + land.num;
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
        if (index == 2)
          boardOccupy[index][i] = 1;

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

// init server
app.get('/init', function(req, res) {
  var querys = ['https://art-festival.herokuapp.com/board/init?board=all', 'https://art-festival.herokuapp.com/land/init', 'https://art-festival.herokuapp.com/user/init/all']
  for (var i = 0; i < querys.length; i++) {
    var pathname = querys[i];
    request({
      url: pathname,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {}
    });
  }
  var result = '<h1 style="color:#6e467c;">Server Init</h1>' + '<h1 style="color:#b23e48;">Succeed!</h1>';
  res.send(result);
});

// start counting time
app.get('/time/sync/:dir', function(req, res) {
  var direction = req.params.dir;
  USER.once("value", function(snapshot) {
    var allUsers = snapshot.val();
    USERTIME.once("value", function(snapshot) {
      var userTimes = snapshot.val();
      if (direction == 'touser') {
        for (var user in userTimes) {
          allUsers[user].timeLeft.hours = userTimes[user].hours;
          allUsers[user].timeLeft.mins = userTimes[user].mins;
          allUsers[user].timeLeft.secs = userTimes[user].secs;
          allUsers[user].interest = userTimes[user].interest;
        }
        USER.set(allUsers);
        res.send(allUsers);
      }
      else if (direction == 'tousertime') {
        for (var user in allUsers) {
          userTimes[user] = allUsers[user].timeLeft;
          userTimes[user].interest = allUsers[user].interest;
        }
        USERTIME.set(userTimes);
        res.send(userTimes);
      }
    });
  });
});

// start counting time
app.get('/time/start', function(req, res) {
  CENTER.child('status').set('active');
  center.status = 'active';
  
  // start counter
  if (childNum == 0) {
    var timer = new Date();
    startTime = timer.getTime();
    counter = 0;
    childNum = 1;
    console.log(" [O] Counter start.");
    setInterval(updateTime, 998*interval);
  }

  USERTIME.once("value", function(snapshot) {
    var userTimes = snapshot.val();
    // if (childNum == 0) {
    //   childProcess = child_process.fork('./counter.js');
    //   childNum = 1;
    // }
    res.send(userTimes);
  });
});

// stop counting time/
app.get('/time/stop', function(req, res) {
  //childProcess.kill();
  //childNum = 0;
  center.status = 'pause';
  CENTER.child('status').set('pause');
  res.send('<h1 style="color:green;">Time Stopped!</h1>');
});

function updateTime() {
  if (center.status == 'pause') {
    // do nothing
  }
  else if (center.status == 'active') {
    counter += 1;

    var speed = center.speed;
    USERTIME.once("value", function(snapshot) {
  
      var userTimes = snapshot.val();
  
      // count every user's time
      for (var user in userTimes) {
        if (dead(userTimes[user]))
          USER.child(user).child('isAlive').set(false);
        else
          userTimes[user] = addInterest(userTimes[user], speed);
      }
      USERTIME.set(userTimes);
    });
    console.log("Game Time: %s(sec), count: %s", (Date.now()-startTime)/1000, counter*interval);
  }
}

function addInterest(timeLeft, speed) {
  timeLeft.secs += (timeLeft.interest*interval);
  timeLeft.secs -= (speed*interval);

  var time = timeLeft.hours*3600 + timeLeft.mins*60 + timeLeft.secs;
  if (time < 0)
    return timeLeft;
  timeLeft.hours = Math.floor(time / 3600);
  timeLeft.mins = Math.floor((time % 3600) / 60);
  timeLeft.secs = (time % 3600) % 60;
  return timeLeft;
}

function dead(timeLeft) {
  var time = timeLeft.hours*3600 + timeLeft.mins*60 + timeLeft.secs;
  if (time < 0)
    return true;
  else
    return false;
}

// get data center
app.get('/center', function(req, res) {
  CENTER.once("value", function(snapshot) {
    res.send(snapshot.val());
  });
});

// set speed
app.get('/center/speed', function(req, res) {
  var speed = req.query.speed;
  CENTER.child('speed').set(speed);
  res.send({speed: req.query.speed});
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
  result += ('<br /><br /><h3 style="color:#6f502c;"> Need help? see <a href="http://art-festival.herokuapp.com/help">User Manual<a> </h3>');
  res.send(result);
});

// help
app.get('/help', function(req, res) {
  var result = parser.welcomeMsg();
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
      fs.writeFile('public/result.txt', JSON.stringify(body, null, 4), function(err) {
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
