	$(document).ready(function(){

		//menu slider
		// $('.blueberry').blueberry({
		// 			'interval':5000,	//Sets the time between slide transitions, in milliseconds.
		// 			'duration':500,	//Sets the speed of the fade transition, in milliseconds.
		// 			'lineheight':1,	//Sets the line height, in px, the '.slides' element should use. The '.slides' element height will always be a multiple of this.
		// 			'hoverpause':false}
		// );
		// $('#unoslider').unoslider({
		//   animation: { 
		//     transition: 'slide_out' 
		//   } 
		// });
		
		//text input watermarks
		watermark_func();
	
	/*$('button_register').click(function(){
	  window.location = index.php;
	});	
	*/
	
	$("#button_register").button().click(function(){
		document.location.href = "index.php/admin/login";
	});

	$("#button_login").button().click(function(){
		document.location.href = "index.php/admin/login";
	});

	/*
	//add event to buttons
	document.getElementById("button_register").onclick = function(){
		window.location.href="www.elpais.es"		
	};
	*/
	
	/*
	document.getElementById("button_login").onclick = function(){
		alert('HEERREE');
		window.location="www.elpais.es";
	};
	*/
	
	document.getElementById("button_add").onclick = function(){
		content_retrieved = document.getElementById('input_story').value;		

		//we parse the first link in the content to be sent also
		temp_link = parseURL(content_retrieved);
		
		//we add the markup to the links in the text, so they show up as html link
		temp_content = linkify(content_retrieved);
		
		temp_title = document.getElementById('input_title').value;
		createTempMarker(temp_content,temp_title,temp_link);
	};
	document.getElementById("button_save").onclick = function(){
		saveTempMarker();
	};
	
	$("#input_story").keypress(function(){
		check_url();
	});
	
	
	
	/*http://net.tutsplus.com/tutorials/javascript-ajax/submit-a-form-without-page-refresh-using-jquery/
	$('.error').hide();  
	
	$(".button").click(function() {  
	    // validate and process form here  

	    $('.error').hide();  
	      var name = $("input#name").val();  
	        if (name == "") {  
	      $("label#name_error").show();  
	      $("input#name").focus();  
	      return false;  
	    }  
	        var email = $("input#email").val();  
	        if (email == "") {  
	      $("label#email_error").show();  
	      $("input#email").focus();  
	      return false;  
	    }  
	        var phone = $("input#phone").val();  
	        if (phone == "") {  
	      $("label#phone_error").show();  
	      $("input#phone").focus();  
	      return false;  
	    }  

	  });  
	});
	*/
	
})
function parseURL(text) {
	//method to retrieve the URL inside a string
	var urlRegex = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;
	
	foundUrls = text.match(urlRegex);
	if (!foundUrls)
		return ""; 
	else
		return foundUrls;
};

//    ^(http://|https://)?(([a-z0-9]?([-a-z0-9]*[a-z0-9]+)?){1,63}\.)+[a-z]{2,6} 
//    $pattern = "/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i";

function linkify(text) {  
	//function that adds the markup to the links and return an array with the links found
	
	//other regular expressions to test
	//	var urlRegex =/(\b(https?|ftp|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;  
	//	var urlRegex =^(http://|https://)?(([a-z0-9]?([-a-z0-9]*[a-z0-9]+)?){1,63}\.)+[a-z]{2,6}; 
	var urlRegex = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;	
	return text.replace(urlRegex, function(url) {  
	        return '<a href="' + url + '">' + url + '</a>';  
	    })  
}
function isUrlStart(string){
	if ((string.substring(0, 7) == "http://") || (string.substring(0, 3) == "www") || (string.substring(0, 8) == "https://") || (string.substring(0, 3) == "htt"))
		return true;
	else return false;
}

function isValidUrl(str) {
  // var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
  //  	'((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
  //   '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
  //   '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
  //   '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
  //   '(\#[-a-z\d_]*)?$','i'); // fragment locater
  // if(!pattern.test(str)) {
  //   alert("Please enter a valid URL.");
  //   return false;
  // } else {
  //   return true;
  // }
}


function check_url(){
	// $("#input_story").val();
	
};

function watermark_func(){
    $(".watermark").each(function(){
    	$(this).val($(this).attr('placeholder'));
    });

    $(".watermark").focus(function(){
        var placeholder = $(this).attr('placeholder');
        var current_value = $(this).val();
        $(this).css('color', '#676767'); //192750
        if(current_value == placeholder) {
            $(this).val('');
        }

    });

    $(".watermark").blur(function(){

        var placeholder = $(this).attr('placeholder');
        var current_value = $(this).val();

        if(current_value == '') {
            $(this).val(placeholder);
            $(this).css('color', '#676767');
        }

    });
	
};