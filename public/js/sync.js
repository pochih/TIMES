var myDataRef = new Firebase('https://brian-firebase.firebaseio-demo.com/');
var syncRef = myDataRef.child("sync");
var directoryRef = syncRef;
var restaurantID;
var jsonData;

// push data into database
$('#restaurantInput').keypress(function (e) {
	if (e.keyCode == 13) {
	  restaurantID = $('#restaurantInput').val();
	  console.log("Add: " + restaurantID);
    if (restaurantID !== null) {
    	// use api to get json file
    	var pathname = "https://api.eztable.com/v3/app/eztable/restaurants/";
    	pathname += restaurantID;
    	pathname += "/?locale=zh_TW";
    	//console.log(pathname);
    	getJSON(pathname).then(function(data) {
    		// write data into firebase
      	directoryRef = syncRef.child(restaurantID);
      	directoryRef.set({id: data['id'], text: data, Date: data['cdate']});
			}, function(status) {	//error detection....
  			alert('GG');
			});

      $('#restaurantInput').val('');
    }
	}
});

// update data
$('#updateInput').keypress(function (e) {
  if (e.keyCode == 13) {
	  restaurantID = $('#updateInput').val();
	  console.log("Update: " + restaurantID);
    if (restaurantID !== null) {
    	// use api to get json file
    	var pathname = "https://api.eztable.com/v3/app/eztable/restaurants/";
    	pathname += restaurantID;
    	pathname += "/?locale=zh_TW";
    	//console.log(pathname);
    	getJSON(pathname).then(function(data) {
    		// update data into firebase
      	directoryRef = syncRef.child(restaurantID);
      	directoryRef.update({id: data['id'], text: data, Date: data['cdate']});
			}, function(status) { //error detection....
  			alert('Update GG');
			});

      $('#updateInput').val('');
    }
	}
});

// remove data
$('#deleteInput').keypress(function (e) {
  if (e.keyCode == 13) {
	  restaurantID = $('#deleteInput').val();
	  console.log("Delete: " + restaurantID);
    if ($('#messagesDiv').hasClass(restaurantID)) {
    	// delete data from firebase
      directoryRef = syncRef.child(restaurantID);
      directoryRef.remove();
    	$('.' + restaurantID).remove();
      $('#deleteInput').val('');
    }
    else {
    	console.log("ad");
    }
	}
});

directoryRef.on('child_added', function(snapshot) {
 	var message = snapshot.val();
 	//console.log(message);
  if (message.id !== undefined && message.text !== undefined && message.Date !== undefined)
	  displayChatMessage(message.id, message.text.guarantee_provider, message.Date);
 	}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

directoryRef.on('child_changed', function(snapshot) {
  var message = snapshot.val();
  //console.log(message);
  if (message.id !== undefined && message.text !== undefined && message.Date !== undefined)
    displayChatMessage(message.id, message.text.guarantee_provider, message.Date);
	}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function displayChatMessage(id, text, date) {
	$('.' + restaurantID).remove();
	$('<p/>').text(text).attr("class", id).prepend($('<em/>').text(id+': ')).append($('<em/>').text(date).css("float", "right")).appendTo($('#messagesDiv'));
	$('#messagesDiv').addClass(id);
	$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};
