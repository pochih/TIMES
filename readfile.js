var express = require('express');
var app = express();
var request = require("request");
var fs = require('fs');
var child_process = require('child_process');

app.set('port', (process.env.PORT || 8888));

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