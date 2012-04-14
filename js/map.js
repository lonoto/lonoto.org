$(document).ready(function(){  
	initialize();
		
	$(function() {
		$("input#input_location").autocomplete({
			//This bit uses the geocoder to fetch address values
		    source: function(request, response) {
				//alert("request.term:"+request.term);
				
		//		'bounds':LatLngBounds/
				geocoder.geocode({'address': request.term + ', SPAIN', 'region':'es'}, function(results, status) {
					//alert("status:"+status);	
					if (status == google.maps.GeocoderStatus.OK) {
					    //map.setCenter(results[0].geometry.location);
					    //alert("results[0].geometry.location:"+results[0].geometry.location);  
						response($.map(results, function(item) {
				            return {
				              label:  item.formatted_address,
				              value: item.formatted_address,
				              latitude: item.geometry.location.lat(),
				              longitude: item.geometry.location.lng()
				            } //end of return
				        })); //end of response
					}	
					else {
						alert("Geocode was not successful for the following reason: " + status);
					}
	        	})

	      },			
	      //This bit is executed upon selection of an address
	      select: function(event, ui) {
	        //$("#latitude").val(ui.item.latitude);
	        //$("#longitude").val(ui.item.longitude);
			//alert("Select called");
	        
			temp_location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
			temp_lat=ui.item.latitude;
			temp_lng=ui.item.longitude;
	        map.setCenter(temp_location);
	      }
	    });
	});
	//$( "input#autocomplete" ).autocomplete( "option", "minLength", 3 );
	//$( "input#autocomplete" ).autocomplete( "option", "delay", 600 );  	
});


function initialize(){
	var myOptions = {
		center: new google.maps.LatLng(40.463667,	 -3.74922),
		zoom: 6,
		minZoom: 5, 
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	
	//define map bounds
	LatLngBoundsw = new google.maps.LatLng(25.403585, -19.423828);  //next to Islas Canarias, south west limit of box
	LatLngBoundne = new google.maps.LatLng(43.961191, 5.625000); //north east limit of the box

	LatLngBounds = new google.maps.LatLngBounds(LatLngBoundsw, LatLngBoundne);
	
	//restric the drag area
	google.maps.event.addListener(map, 'dragstart', function(){
	                                       dragStartCenter = map.getCenter();
	                                         });

	google.maps.event.addListener(map, 'dragend', function(){
	                            if (!LatLngBounds.contains(map.getCenter())){
			                     	map.setCenter(dragStartCenter);
			                    }
	}); 
	
	geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow();
	loadMarkers();
	close_zoom=19;
	temp_zoom=16;
}


function getInfoContent(marker_data){
	//function that gets the title and info content of a marker from the database.
	//needs:marker_data.title, marker_data.content, marker_data.link, marker_data.fuente

	var contentString = '<div id="content">'+
	    '<div id="siteNotice">'+
	    '</div>'+
	    '<h2 id="firstHeading" class="firstHeading">'+marker_data.title+'</h2>'+
	    '<div id="bodyContent">'+
	    '<p><b>'+marker_data.content+'</p>'+
	    '<p>Fuente: '+marker_data.fuente+' <a target="_blank" href="'+marker_data.link+'">'+marker_data.link+'</a> (last visited June 22, 2009).</p>'+
	    '</div>'+
	    '</div>';
	return 	contentString;
}

function getInfoContentFromDb(){
	//function that gets the title and info content of a marker from the database.
}


function loadMarkers(){
	//function that loads all the markers of the db

	$.getJSON("http://localhost:8888/index.php/marker/all",function(markers_received) {
		//loop through the markers and add them
		for (var key in markers_received){
			createMarker(markers_received[key]);
		}
	});
}




