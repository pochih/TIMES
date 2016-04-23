#!/usr/bin/env node

var request = require("request");
var config = require('../../config.js');

var Firebase = require("firebase");
var myDataRef = new Firebase(config.FIREBASE_URL);
var restaurantRef = myDataRef.child("restaurants");
var productRef = myDataRef.child("products");
var p_productRef = myDataRef.child("premium_products");
var p_plansRef = myDataRef.child("premium_plans");
var emptyFlag = 0;

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var sqs = new AWS.SQS();

var countrys = {
  'tw': ['zh_TW', 'en_US'],
  'th': ['th_TH', 'en_US'],
  'id': ['id_ID', 'en_US'],
  'hk': ['zh_HK', 'en_US']
}

var params = {
  QueueUrl: config.SQS_URL,
  "MaxNumberOfMessages": 1
};

console.log(' [*] Waiting for logs.');
getMessage();

function getMessage() {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      if (data.hasOwnProperty('Messages')) {
        if (typeof data.Messages[0].Body !== 'String') {
          var obj = JSON.parse(data.Messages[0].Body);
          console.log(" [!] id: %s, query: %s, type: %s", obj.id, obj.query, obj.type);
          syncData(obj);
        }
        params.WaitTimeSeconds = 0;
        emptyFlag = 0;
        removeFromQueue(data.Messages[0]);
      }
      else {
        if (emptyFlag == 0) {
          emptyFlag = 1;
          console.log(" [!] Queue is empty!");
        }
        params.WaitTimeSeconds = 20;
        getMessage();
      }
    }
  });
}

function removeFromQueue(message) {
  sqs.deleteMessage({
    QueueUrl: config.SQS_URL,
    ReceiptHandle: message.ReceiptHandle
  }, function(err, data) {
    if (err)
      console.log(err);
    else
      getMessage();
  });
};

function syncData(obj) {

  if (obj.query == 'add') {
    if (obj.type == 'product') {
      var restaurantIdRef = restaurantRef.child(obj.id).child(obj.country).child("products");
      // get data from database, then store data to database
      restaurantIdRef.once("value", function(snapshot) {
        var productIDs = [];
        if (snapshot.val() != null)
          productIDs = snapshot.val();
        if (productIDs.indexOf(obj.pid - 0) < 0) {
          productIDs.push(obj.pid - 0);
          restaurantIdRef.set(productIDs);
        }
        // add new message to queue if country is en_US
        if (obj.country == 'en_US') {
          restaurantIdRef = restaurantRef.child(obj.id).child('en_US');
          restaurantIdRef.once("value", function(snapshot) {
            var country = snapshot.val().information_country;
            var locale = countrys[country][0];
            var newMsg = {};
            newMsg.id = obj.id;
            newMsg.query = obj.query;
            newMsg.type = obj.type;            
            newMsg.pid = obj.pid;                
            newMsg.country = locale;
            var params = {
              QueueUrl: config.SQS_URL,
              MessageBody: JSON.stringify(newMsg)
            };
            sqs.sendMessage(params, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(" [O] Send message: " + params.MessageBody);
              }  
            });
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
    else if (obj.type == 'p_product') {
      var restaurantIdRef = restaurantRef.child(obj.id).child(obj.country).child("premium_product");
      // get data from database, then store data to database
      restaurantIdRef.once("value", function(snapshot) {
        var p_productIDs = [];
        if (snapshot.val() != null)
          p_productIDs = snapshot.val();
        if (p_productIDs.indexOf(obj.ppid) < 0) {
          p_productIDs.push(obj.ppid);
          restaurantIdRef.set(p_productIDs);
        }
        // add new message to queue if country is en_US
        if (obj.country == 'en_US') {
          restaurantIdRef = restaurantRef.child(obj.id).child('en_US');
          restaurantIdRef.once("value", function(snapshot) {
            var country = snapshot.val().information_country;
            var locale = countrys[country][0];
            var newMsg = {};
            newMsg.id = obj.id;
            newMsg.query = obj.query;
            newMsg.type = obj.type;                
            newMsg.ppid = obj.ppid;
            newMsg.country = locale;
            var params = {
              QueueUrl: config.SQS_URL,
              MessageBody: JSON.stringify(newMsg)
            };
            sqs.sendMessage(params, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(" [O] Send message: " + params.MessageBody);
              }  
            });
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
    else if (obj.type == 'p_plan') {
      var restaurantIdRef = restaurantRef.child(obj.id).child(obj.country).child("premium_plans");
      // get data from database, then store data to database
      restaurantIdRef.once("value", function(snapshot) {
        var p_planIDs = [];
        if (snapshot.val() != null)
          p_planIDs = snapshot.val();
        if (p_planIDs.indexOf(obj.planid - 0) < 0) {
          p_planIDs.push(obj.planid - 0);
          restaurantIdRef.set(p_planIDs);
        }
        // add new message to queue if country is en_US
        if (obj.country == 'en_US') {
          restaurantIdRef = restaurantRef.child(obj.id).child('en_US');
          restaurantIdRef.once("value", function(snapshot) {
            var country = snapshot.val().information_country;
            var locale = countrys[country][0];
            var newMsg = {};
            newMsg.id = obj.id;
            newMsg.query = obj.query;
            newMsg.type = obj.type;
            newMsg.planid = obj.planid;
            newMsg.country = locale;
            var params = {
              QueueUrl: config.SQS_URL,
              MessageBody: JSON.stringify(newMsg)
            };
            sqs.sendMessage(params, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(" [O] Send message: " + params.MessageBody);
              }  
            });
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
    console.log(" [x] Add %s in Restaurant %d succeed.", obj.type, obj.id);
  }
  else if (obj.query == 'remove') {
    if (obj.type == 'product') {
      var restaurantIdRef = restaurantRef.child(obj.id).child(obj.country).child("products");
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
        // add new message to queue if country is en_US
        if (obj.country == 'en_US') {
          restaurantIdRef = restaurantRef.child(obj.id).child('en_US');
          restaurantIdRef.once("value", function(snapshot) {
            var country = snapshot.val().information_country;
            var locale = countrys[country][0];
            var newMsg = {};
            newMsg.id = obj.id;
            newMsg.query = obj.query;
            newMsg.type = obj.type;            
            newMsg.pid = obj.pid;                
            newMsg.country = locale;
            var params = {
              QueueUrl: config.SQS_URL,
              MessageBody: JSON.stringify(newMsg)
            };
            sqs.sendMessage(params, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(" [O] Send message: " + params.MessageBody);
              }  
            });
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
    else if (obj.type == 'p_product') {
      var restaurantIdRef = restaurantRef.child(obj.id).child(obj.country).child("premium_product");
      // get data from database, then remove data from database
      restaurantIdRef.once("value", function(snapshot) {
        var p_productIDs = [];
        if (snapshot.val() != null)
          p_productIDs = snapshot.val();
        var index = p_productIDs.indexOf(obj.ppid);
        if (index >= 0) {
          p_productIDs.splice(index, 1);
          restaurantIdRef.set(p_productIDs);
        }
        // add new message to queue if country is en_US
        if (obj.country == 'en_US') {
          restaurantIdRef = restaurantRef.child(obj.id).child('en_US');
          restaurantIdRef.once("value", function(snapshot) {
            var country = snapshot.val().information_country;
            var locale = countrys[country][0];
            var newMsg = {};
            newMsg.id = obj.id;
            newMsg.query = obj.query;
            newMsg.type = obj.type;                
            newMsg.ppid = obj.ppid;
            newMsg.country = locale;
            var params = {
              QueueUrl: config.SQS_URL,
              MessageBody: JSON.stringify(newMsg)
            };
            sqs.sendMessage(params, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(" [O] Send message: " + params.MessageBody);
              }  
            });
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
    else if (obj.type == 'p_plan') {
      var restaurantIdRef = restaurantRef.child(obj.id).child(obj.country).child("premium_plans");
      // get data from database, then remove data from database
      restaurantIdRef.once("value", function(snapshot) {
        var p_planIDs = [];
        if (snapshot.val() != null)
          p_planIDs = snapshot.val();
        var index = p_planIDs.indexOf(obj.planid - 0);
        if (index >= 0) {
          p_planIDs.splice(index, 1);
          restaurantIdRef.set(p_planIDs);
        }
        // add new message to queue if country is en_US
        if (obj.country == 'en_US') {
          restaurantIdRef = restaurantRef.child(obj.id).child('en_US');
          restaurantIdRef.once("value", function(snapshot) {
            var country = snapshot.val().information_country;
            var locale = countrys[country][0];
            var newMsg = {};
            newMsg.id = obj.id;
            newMsg.query = obj.query;
            newMsg.type = obj.type;
            newMsg.planid = obj.planid;
            newMsg.country = locale;
            var params = {
              QueueUrl: config.SQS_URL,
              MessageBody: JSON.stringify(newMsg)
            };
            sqs.sendMessage(params, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(" [O] Send message: " + params.MessageBody);
              }  
            });
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }
    console.log(" [x] Remove %s in Restaurant %d succeed.", obj.type, obj.id);
  }
  else if (obj.query == 'delete') {
    // set pathname
    var pathname;
    if (obj.type == 'restaurant') {
      pathname = "https://api.eztable.com/v3/app/eztable/restaurants/";
      pathname += obj.id;
      pathname += "/?locale=en_US";
      console.log("query from: " + pathname);
      request({
        url: pathname,
        json: true
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          databaseSync(body, obj);
          console.log(" [x] %s resID %s succeed.", obj.query, obj.id);
        }
        else {
          console.log(error);
        }
      });
    }
    else if (obj.type == 'product') {
      var productIdRef = productRef.child(obj.id);
      productIdRef.remove();
      console.log(" [x] %s product %s succeed.", obj.query, obj.id);
    } 
    // else if (obj.type == "p_product") {
    //   pathname = "http://api.eztable.com/v3/products/premium/";
    //   pathname += obj.id;
    // }
  }
  else if (obj.query == 'sync') {
    // set pathname
    var pathname;
    if (obj.type == 'restaurant') {
      pathname = "https://api.eztable.com/v3/app/eztable/restaurants/";
      pathname += obj.id;
      pathname += "/?locale=";
      pathname += obj.country;
    }
    else if (obj.type == 'product') {
      pathname = "https://api.eztable.com/v3/restaurants/";
      pathname += obj.id;
      pathname += "/products?locale=";
      pathname += obj.country;
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
        if (obj.country == 'en_US') {
          var country = "";
          if (obj.type == 'restaurant')
            country = body.information.country;
          else if (obj.type == 'product' && body['products'].length > 0)
            country = body['products'][0].country;
          if (country != "") {
            var locale = countrys[country][0];
            var newMsg = {};
            newMsg.id = obj.id;
            newMsg.query = 'sync';
            newMsg.type = obj.type;
            newMsg.country = locale;
            var params = {
              QueueUrl: config.SQS_URL,
              MessageBody: JSON.stringify(newMsg)
            };
            sqs.sendMessage(params, function (err, data) {
              if (err) {
                console.log(err);
              } else {
                console.log(" [O] Send message: " + params.MessageBody);
              }  
            });
          }
        }
        databaseSync(body, obj);
        console.log(" [x] get resID: %s, query: %s, country: %s", obj.id, obj.query, obj.country);
      }
      else {
        console.log(error);
      }
    });
  }
}

function databaseSync(body, obj) {
  if (body !== null) {
    if (obj.query == 'sync') {
      if (obj.type == 'restaurant') {
        var parse_body = parseBody(body, obj);
        var restaurantIdRef = restaurantRef.child(parse_body.id).child(obj.country);
        restaurantIdRef.set(parse_body);

        // show log
        console.log("sync res ID: " + parse_body.id + " country: " + obj.country + " succeed.");
      }
      else if (obj.type == 'product') {
        parseProductBody(body, obj);
      }
      else if (obj.type == 'p_product') {
        var parse_body = parseBody(body);
        var p_productIdRef = p_productRef.child(obj.id).child(obj.country);
        p_productIdRef.set(parse_body);

        // show log
        console.log(" [O] sync res ID: " + obj.id + " country: " + obj.country + " succeed.");
      }
    }
    else if (obj.query == 'delete') {
      d_parseBody(body);
      var restaurantIdRef = restaurantRef.child(body.id);
      restaurantIdRef.remove();

      // show log
      console.log(" [O] delete from res ID: " + body.id + " succeed.");
    }
    // else if (obj.query == 'debug') {
    //   var restaurants = require('../json/restaurant.json');
    //   var bugs = [];
    //   for (var i = 0; i < restaurants.resIDs.length; i++) {
    //     if (counter.indexOf(restaurants.resIDs[i]) < 0) {
    //       console.log(" [X] Bug! " + restaurants.resIDs[i] + "not found.");
    //       bugs.push(restaurants.resIDs[i]);
    //     }
    //   }
    //   if (bugs.length == 0)
    //     console.log("Bug Free~~");
    //   console.log("counter's size: " + counter.length);
    //   counter = [];
    // }
  }
  else
    console.log("id not found!");
}

function parseBody(body, obj) {
  for (var key in body) {
    if (key == 'premium_product') {
      updateProduct(body, body[key], obj);
    }
    else if (key == 'premium_plans') {
      updatePlans(body, body[key], obj);
    }
    else if (key == 'images' || key == 'imgs' || key == '') {
      // do nothing
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

function parseProductBody(body, msgobj) {
  // produce the data
  var obj = body['products'];
  for (var i = 0; i < obj.length; i++) {
    var productId = obj[i]['identifier'];

    // write into firebase
    var parse_body = parseBody(obj[i]);
    var productIdRef = productRef.child(productId).child(msgobj.country);
    productIdRef.set(parse_body);

    // show log
    console.log("sync product Identifier " + productId + ", country " + msgobj.country + " succeed.");
  }
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

function updateProduct(body, obj, msgobj) {
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
    var p_productIdRef = p_productRef.child(productId).child(msgobj.country);
    p_productIdRef.set(parse_body);
  }
}

function updatePlans(body, obj, msgobj) {
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
    var p_plansIdRef = p_plansRef.child(plansId).child(msgobj.country);
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