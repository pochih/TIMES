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
	    var parse_body = d_parseBody(body);
	    var restaurantIdRef = restaurantRef.child(resID);
	    restaurantIdRef.remove();
	    process.send({ id: resID });
	  }
	});
});

function d_parseBody(body) {
  for (var key in body) {
    if (key == 'premium_product') {
      d_updateProduct(body, body[key]);
    }
    else if (key == 'premium_plans') {
      d_updatePlans(body, body[key]);
    }
  }
  return body;
}

function d_updateProduct(body, obj) {
  // produce the data
  for (var i = 0; i < obj.length; i++) {
    var productId = obj[i]['id'];
    var productIdRef = productRef.child(productId);
    productIdRef.remove();
  }
}

function d_updatePlans(body, obj) {
  // produce the data
  for (var i = 0; i < obj.length; i++) {
    var plansId = obj[i]['id'];
    var plansIdRef = plansRef.child(plansId);
    plansIdRef.remove();
  }
}