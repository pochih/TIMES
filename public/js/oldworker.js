#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var request = require("request");

var Firebase = require("firebase");
var myDataRef = new Firebase('https://eztable-firebase.firebaseio.com/');
var restaurantRef = myDataRef.child("restaurants");
var productRef = myDataRef.child("products");
var p_productRef = myDataRef.child("premium_products");
var p_plansRef = myDataRef.child("premium_plans");

var rabbitmqUrl = process.env.CLOUDAMQP_URL || "amqp://localhost";
var counter = [];

amqp.connect(rabbitmqUrl, function(err, conn) {
  console.log("[!] Link to RabbitMQ server at: " + rabbitmqUrl);
  conn.createChannel(function(err, ch) {
    var q = 'sync-data';

    ch.assertQueue(q, {durable: true});
    console.log(' [*] Waiting for logs. To exit press CTRL+C');

    ch.consume(q, function(msg) {
      var obj = JSON.parse(msg.content.toString());
      console.log(" [!] get: " + JSON.stringify(obj));
      if (obj.query == 'add') {
        if (obj.type == 'product') {
          var restaurantIdRef = restaurantRef.child(obj.id).child("products");
          // get data from database, then store data to database
          restaurantIdRef.once("value", function(snapshot) {
            var productIDs = [];
            if (snapshot.val() != null)
              productIDs = snapshot.val();
            if (productIDs.indexOf(obj.pid - 0) < 0) {
              productIDs.push(obj.pid - 0);
              restaurantIdRef.set(productIDs);
            }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
        else if (obj.type == 'p_product') {
          var restaurantIdRef = restaurantRef.child(obj.id).child("premium_products");
          // get data from database, then store data to database
          restaurantIdRef.once("value", function(snapshot) {
            var p_productIDs = [];
            if (snapshot.val() != null)
              p_productIDs = snapshot.val();
            if (p_productIDs.indexOf(obj.ppid - 0) < 0) {
              p_productIDs.push(obj.ppid - 0);
              restaurantIdRef.set(p_productIDs);
            }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
        console.log(" [x] Add succeed.");
      }
      else if (obj.query == 'remove') {
        if (obj.type == 'product') {
          var restaurantIdRef = restaurantRef.child(obj.id).child("products");
          // get data from database, then remove data from database
          restaurantIdRef.once("value", function(snapshot) {
            var productIDs = [];
            if (snapshot.val() != null)
              productIDs = snapshot.val();
            var index = productIDs.indexOf(obj.pid - 0);
            if (index >= 0) {
              productIDs.splice(index, 1);
              restaurantIdRef.set(productIDs);
            }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
        else if (obj.type == 'p_product') {
          var restaurantIdRef = restaurantRef.child(obj.id).child("premium_products");
          // get data from database, then remove data from database
          restaurantIdRef.once("value", function(snapshot) {
            var p_productIDs = [];
            if (snapshot.val() != null)
              p_productIDs = snapshot.val();
            var index = p_productIDs.indexOf(obj.ppid - 0);
            if (index >= 0) {
              p_productIDs.splice(index, 1);
              restaurantIdRef.set(p_productIDs);
            }
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
        console.log(" [x] Remove succeed.");
      }
      else if (obj.query == 'sync' || obj.query == 'delete') {
        // set pathname
        var pathname;
        if (obj.type == 'restaurant') {
          pathname = "https://api.eztable.com/v3/app/eztable/restaurants/";
          pathname += obj.id;
          pathname += "/?locale=zh_TW";
        }
        else if (obj.type == 'product') {
          pathname = "https://api.eztable.com/v3/restaurants/";
          pathname += obj.id;
          pathname += "/products?locale=zh_TW";
        } 
        else if (obj.type == "p_product") {
          pathname = "http://api.eztable.com/v3/products/premium/";
          pathname += obj.id;
        }
        console.log("query from: " + pathname);
        request({
          url: pathname,
          json: true
        }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            databaseSync(body, obj);
            console.log(" [x] get resID: %s, query: %s", obj.id, obj.query);
          }
        });
      }
    }, {noAck: true});
  });
});

function databaseSync(body, obj) {
  if (body !== null) {
    if (obj.query == 'sync') {
      var parse_body = parseBody(body);
      if (obj.type == 'restaurant') {
        var restaurantIdRef = restaurantRef.child(parse_body.id);
        restaurantIdRef.set(parse_body);
        counter.push(parse_body.id);

        // show log
        console.log("sync res ID: " + parse_body.id + " succeed.");
      }
      else if (obj.type == 'product') {
        var productIdRef = productRef.child(obj.id);
        productIdRef.set(parse_body);
        counter.push(obj.id);

        // show log
        console.log("sync res ID" + obj.id + "'s product succeed.");
      }
      else if (obj.type == 'p_product') {
        var p_productIdRef = p_productRef.child(obj.id);
        p_productIdRef.set(parse_body);
        counter.push(obj.id);

        // show log
        console.log("sync res ID: " + obj.id + " succeed.");
      }
    }
    else if (obj.query == 'delete') {
      d_parseBody(body);
      var restaurantIdRef = restaurantRef.child(body.id);
      restaurantIdRef.remove();
      counter.push(body.id);

      // show log
      console.log("delete from res ID: " + body.id + " succeed.");
    }
    else if (obj.query == 'debug') {
      var restaurants = require('../json/restaurant.json');
      var bugs = [];
      for (var i = 0; i < restaurants.resIDs.length; i++) {
        if (counter.indexOf(restaurants.resIDs[i]) < 0) {
          console.log(restaurants.resIDs[i] + "not found.");
          bugs.push(restaurants.resIDs[i]);
        }
      }
      if (bugs.length == 0)
        console.log("Bug Free~~");
      console.log("counter's size: " + counter.length);
      counter = [];
    }
  }
  else
    console.log("id not found!");
}

function parseBody(body) {
  for (var key in body) {
    if (key == 'premium_product') {
      updateProduct(body, body[key]);
    }
    else if (key == 'premium_plans') {
      updatePlans(body, body[key]);
    }
    else if (key == '') {

    }
    else if (typeof body[key] === 'object' && !Array.isArray(body[key])) {
      var keyname = key + '_';
      updateJson(body, keyname, body[key]);
      // remove obj from body
      delete body[key];
    }
  }
  return body;
}

function updateJson(body, keyname, obj) {
  // update body
  for (var key in obj) {
    var subkeyname = keyname + key;
    if (Array.isArray(obj[key])) {
      body[subkeyname] = obj[key];
    }
    else if (key == 'images' || key == 'imgs') {
      body[subkeyname] = obj[key];
    }
    else if (typeof obj[key] === 'object') {
      subkeyname += '_';
      updateJson(body, subkeyname, obj[key]);
    }
    else {
      body[subkeyname] = obj[key];
    }
  }
}

function updateProduct(body, obj) {
  // clear the original premium_product
  delete body['premium_product'];
  body['premium_product'] = [];

  // produce the data
  for (var i = 0; i < obj.length; i++) {
    var productId = obj[i]['id'];

    // update premium_product
    body['premium_product'].push(productId);

    // write into firebase
    var parse_body = parseBody(obj[i]);
    var p_productIdRef = p_productRef.child(productId);
    p_productIdRef.set(parse_body);
  }
}

function updatePlans(body, obj) {
  // clear the original premium_product
  delete body['premium_plans'];
  body['premium_plans'] = [];

  // produce the data
  for (var i = 0; i < obj.length; i++) {
    var plansId = obj[i]['id'];

    // update premium_product
    body['premium_plans'].push(plansId);

    // write into firebase
    var parse_body = parseBody(obj[i]);
    var p_plansIdRef = p_plansRef.child(plansId);
    p_plansIdRef.set(parse_body);
  }
}

function d_parseBody(body) {
  for (var key in body) {
    if (key == 'premium_product') {
      d_updateProduct(body, body[key]);
    }
    else if (key == 'premium_plans') {
      d_updatePlans(body, body[key]);
    }
  }
}

function d_updateProduct(body, obj) {
  // produce the data
  for (var i = 0; i < obj.length; i++) {
    var productId = obj[i]['id'];
    var p_productIdRef = p_productRef.child(productId);
    p_productIdRef.remove();
  }
}

function d_updatePlans(body, obj) {
  // produce the data
  for (var i = 0; i < obj.length; i++) {
    var plansId = obj[i]['id'];
    var p_plansIdRef = p_plansRef.child(plansId);
    p_plansIdRef.remove();
  }
}