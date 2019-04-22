(function($){
	var userID = 0;
	var islogged = false;

	$(document).ready(function(){

	});

	 chrome.extension.onConnect.addListener(function(port) {
	      console.log("Connected .....");
	      port.onMessage.addListener(function(msg) {
	           if(msg === "getData"){
					port.postMessage({
						user : userID,
						islogged : islogged
					});
	           }
	           else{
	           		userID = msg.user;
	           		islogged = msg.islogged;
	           }
	      });
	 })

})(jQuery);
