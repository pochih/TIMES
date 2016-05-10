var config = require('./config.js');
var Firebase = require("firebase");
var DB = new Firebase(config.FIREBASE_URL);
var USER = DB.child("users");
var USERTIME = DB.child("usertimes");
var CENTER = DB.child("center");

var timer = new Date();
var startTime = timer.getTime();
var counter = 0;

// start counter
setInterval(updateTime, 994*3);

function updateTime() {
	counter += 1;

   	CENTER.child('speed').once("value", function(snapshot) {
   		var speed = snapshot.val();
   		USERTIME.once("value", function(snapshot) {

			var userTimes = snapshot.val();

			// count every user's time
			for (var user in userTimes) {
				userTimes[user] = addInterest(userTimes[user], speed);
				if (dead(userTimes[user]))
					USER.child(user).isAlive = false;
			}
			USERTIME.set(userTimes);
		})
   	});
   	console.log("Game Time: %s(sec), count: %s", (Date.now()-startTime)/1000, counter*3);
}

function addInterest(timeLeft, speed) {
	timeLeft.secs += (timeLeft.interest*3);
	timeLeft.secs -= (speed*3);

	var time = timeLeft.hours*3600 + timeLeft.mins*60 + timeLeft.secs;
	timeLeft.hours = Math.floor(time / 3600);
	timeLeft.mins = Math.floor((time % 3600) / 60);
	timeLeft.secs = Math.floor((time % 3600) % 60);
	return timeLeft;
}

function dead(timeLeft) {
	var time = timeLeft.hours*3600 + timeLeft.mins*60 + timeLeft.secs;
	if (time < 0)
		return true;
	else
		return false;
}
