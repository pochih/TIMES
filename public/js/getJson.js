var request = require("request");
var Firebase = require("firebase");
//var myDataRef = new Firebase('https://brian-firebase.firebaseio-demo.com/');
var myDataRef = new Firebase('https://eztable-firebase.firebaseio.com/');
var restaurantRef = myDataRef.child("restaurants");
var productRef = myDataRef.child("premium_products");
var plansRef = myDataRef.child("premium_plans");
var resID;

process.on('message', function(m) {
	resID = m.id;
  console.log("child start to update res ID " +  resID);

  // set pathname
	var pathname = "http://api.eztable.com/v3/app/eztable/restaurants/";
	pathname += resID;
	pathname += "/?locale=zh_TW";
	console.log("query from: " + pathname);
	request({
	  url: pathname,
	  json: true
	}, function (error, response, body) {
	  if (!error && response.statusCode === 200) {
	    var parse_body = parseBody(body);
	    var restaurantIdRef = restaurantRef.child(resID);
	    restaurantIdRef.set(parse_body);
	    process.send({ id: resID });
	  }
	});
});

function parseBody(body) {
  for (var key in body) {
    if (key == 'premium_product') {
      updateProduct(body, body[key]);
    }
    else if (key == 'premium_plans') {
      updatePlans(body, body[key]);
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
    var productIdRef = productRef.child(productId);
    productIdRef.set(parse_body);
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
    var plansIdRef = plansRef.child(plansId);
    plansIdRef.set(parse_body);
  }
}