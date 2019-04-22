$(document).ready(function(){
    'use strict';
	
    var offers;
    var islogged;
    var index = 0;
    var userId = 0;
    var prompt1 = "U s e r s";
    var prompt2 = "S e l e c t   y o u";
	var port = chrome.extension.connect({
	  name: "Sample Communication"
	});
	port.postMessage("getData",);
	port.onMessage.addListener(function(msg) {
		islogged = msg.islogged;
		userId = msg.user;
	});
    $.ajax ({
	    type: "GET",
	    url: "https://dial4.tiresandoil.com/getUsers.php",
	    // cache: false,
	    success: function(data) {
	    	offers = JSON.parse(data);
	    	offers.sort(function(a,b){
	    		return b["numOfCalls"]-a["numOfCalls"];
	    	});
	    	if(islogged)
	    		$("p").html(prompt1);
	    	else	
	    		$("p").html(prompt2);
	    	for (var i = 0; i < offers.length; i++) {

	    		var html = "<li><a id = '"+i+"'>"+offers[i]["first_name"]+' '+offers[i]["last_name"]+' ('+offers[i]["numOfCalls"]+')</a></li>';
    	     
	    		if(islogged && offers[i]["id"] ==  userId){
	    			var html = "<li class='user'><a  id = '"+i+"'>"+offers[i]["first_name"]+' '+offers[i]["last_name"]+' ('+offers[i]["numOfCalls"]+')</a></li>';
	    		}
    		    $("ul").append(html);
    	        document.getElementById(i).addEventListener('click', doAmazingThings);
	    	}
	    }
    });    	
  
	function doAmazingThings() {
		if(!islogged){
			islogged = true;
			index = $(this).attr("id");
			userId = offers[index]["id"];
			port.postMessage({
				user : userId,
				islogged : true
			});
			$("p").html(prompt1);
			$("ul").html('');
	    	for (var i = 0; i < offers.length; i++) {

	    		var html = "<li><a id = '"+i+"'>"+offers[i]["first_name"]+' '+offers[i]["last_name"]+' ('+offers[i]["numOfCalls"]+')</a></li>';
		     
	    		if(islogged && offers[i]["id"] ==  userId){
	    			var html = "<li class='user'><a  id = '"+i+"'>"+offers[i]["first_name"]+' '+offers[i]["last_name"]+' ('+offers[i]["numOfCalls"]+')</a></li>';
	    		}
			    $("ul").append(html);
		        document.getElementById(i).addEventListener('click', doAmazingThings);
	    	}
		}
	    $.ajax ({
		    type: "POST",
		    url: "https://dial4.tiresandoil.com/getCalls.php",
		    data: {"id":userId},
		    success: function(data) {
		    	if(data<25 && data>=0)
		    		chrome.browserAction.setIcon({path:"icons/icon_white.png"});
		    	if(data>=25 && data<50)
		    		chrome.browserAction.setIcon({path:"icons/icon_yellow.png"});
		    	if(data>=50 && data<75)
		    		chrome.browserAction.setIcon({path:"icons/icon_orange.png"});
		    	if(data>=75 && data<100)
		    		chrome.browserAction.setIcon({path:"icons/icon_blue.png"});
		    	if(data>=100)
		    		chrome.browserAction.setIcon({path:"icons/icon_green.png"});
				window.setInterval(updateIcons, 1000*60*10);
		   }
	    });		
		// var html = "<li><a id = '"+index+"' style='text-color:red;' >"+offers[index]["first_name"]+' '+offers[index]["last_name"]+'</a></li>';
		// $("ul").html('');
		// $("ul").append(html);
	}
	function updateIcons() {
		islogged = true;
		// $("ul").html('');
		// var html = "<li><a id = '"+index+"' style='text-color:red;' >"+offers[index]["first_name"]+' '+offers[index]["last_name"]+'</a></li>';
		// $("ul").append(html);
	    $.ajax ({
		    type: "POST",
		    url: "https://dial4.tiresandoil.com/getCalls.php",
		    data: {"id":userId},
		    success: function(data) {
		    	if(data<25 && data>=0)
		    		chrome.browserAction.setIcon({path:"icons/icon_white.png"});
		    	if(data>=25 && data<50)
		    		chrome.browserAction.setIcon({path:"icons/icon_yellow.png"});
		    	if(data>=50 && data<75)
		    		chrome.browserAction.setIcon({path:"icons/icon_orange.png"});
		    	if(data>=75 && data<100)
		    		chrome.browserAction.setIcon({path:"icons/icon_blue.png"});
		    	if(data>=100)
		    		chrome.browserAction.setIcon({path:"icons/icon_green.png"});
		   }
	    });
	}
});

