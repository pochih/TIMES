var myDataRef = new Firebase('https://brian-firebase.firebaseio-demo.com/');
var usersRef = myDataRef.child("details");
var dairyRef = myDataRef.child("diary");
var dateRef = dairyRef;
var name;
var text;
var date;

  // set()
	usersRef.child("BrianHuang").set({
	  	date_of_birth: "Oct 19, 1993",
	  	full_name: "Po-Chih Huang"
	});
	usersRef.child("NTU").set({
	  	date_of_birth: "1928",
	  	full_name: "national taiwan university"
	});
    
  // update()
  usersRef.child("NTU").update({
     	"nickname": "台大"
  });

	// push()
  $('#messageInput').keypress(function (e) {
  	if (e.keyCode == 13) {
  	  name = $('#nameInput').val();
  	  text = $('#messageInput').val();
  	  date = $('#dateInput').val();
      if (date !== null) {
        dateRef = dairyRef.child(date);
        dateRef.set({name: name, text: text, Date: date});
        $('#messageInput').val('');
      }
  	}
  });

  // update()
  $('#messageInputUp').keypress(function (e) {
    if (e.keyCode == 13) {
        name = $('#nameInputUp').val();
        text = $('#messageInputUp').val();
        date = $('#dateInputUp').val();
        dateRef = dairyRef.child(date);
        dateRef.update({name: name, text: text, Date: date});
        $('#messageInputUp').val('');
    }
  });

  // remove()
  $('#deleteInput').keypress(function (e) {
    if (e.keyCode == 13) {
      date = $('#deleteInput').val();
      dateRef = dairyRef.child(date);
      dateRef.remove();
      $('#deleteInput').val('');
      $('.' + date).remove();
    }
  });

  // retrieve data
  // 共有五種事件：
  // 1. Value、2. Child Added、3. Child Changed、4. Child Removed、5. Child Moved
  dateRef.on('child_added', function(snapshot) {
  	var message = snapshot.val();
  	console.log(message);
    if (message.name !== undefined && message.text !== undefined)
		    displayChatMessage(message.name, message.text, message.Date);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
	});
  dateRef.on('child_changed', function(snapshot) {
    var message = snapshot.val();
    console.log(message);
    if (message.name !== undefined && message.text !== undefined)
      displayChatMessage(message.name, message.text, message.Date);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  function displayChatMessage(name, text, date) {
    $('.' + date).remove();
  	$('<p/>').text(text).attr("class", date).prepend($('<em/>').text(name+': ')).append($('<em/>').text(date).css("float", "right")).appendTo($('#messagesDiv'));
  	$('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };