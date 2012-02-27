$(document).ready(function(){  
	initialize();
	
	//we get the center of the map
	//map_center = map.getCenter()
	// $("#input_location").watermark("Introduce una ciudad, una dirección...");
	// $("#input_story").watermark("Introduce un link de una noticia, una historia personal...");

	//autofocus input element
	//$('.auto-focus:first').focus();
	
		
	// $("#button_add").click(function() { 
	// 		//alert("Me has pulsado bien!!");
	// 		//var lat= 40.463667;
	// 		//var lng= 3.74922;
	// 		//var marker_data = {'lat':40.463667, 'lng':3.74922};
	// 		addMarker(marker_data);
	// });
	
	$("#button_save").click(function() { 
			//alert("Me has pulsado bien!!");
			saveMarker();
	});
	
	$("#button_load").click(function() { 
			//alert("Me has pulsado bien!!");
			loadMarkers();
	});	
	
	$(function() {
		$("input#input_location").autocomplete({
			//This bit uses the geocoder to fetch address values
		    source: function(request, response) {
				//alert("request.term:"+request.term);
				
				//define the box for the results
				LatLngBoundsw = new google.maps.LatLng(25.403585, -19.423828);  //next to Islas Canarias, south west limit of box
				LatLngBoundne = new google.maps.LatLng(43.961191, 5.625000); //north east limit of the box

				LatLngBounds = new google.maps.LatLngBounds(LatLngBoundsw, LatLngBoundne);
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
	        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
	        //marker.setPosition(location);
			aux_marker = new google.maps.Marker({
			    position: location,	
			    draggable: true
			});
			
	        map.setCenter(location);
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
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow();
	
}

function getInfoContent(){
	//function that gets the title and info content of a marker from the database.
	
	var contentString = '<div id="content">'+
	    '<div id="siteNotice">'+
	    '</div>'+
	    '<h2 id="firstHeading" class="firstHeading">Uluru</h2>'+
	    '<div id="bodyContent">'+
	    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
	    'sandstone rock formation in the southern part of the '+
	    'Northern Territory, central Australia. It lies 335 km (208 mi) '+
	    'south west of the nearest large town, Alice Springs; 450 km '+
	    '(280 mi) by road. Kata Tjuta and Uluru are the two major '+
	    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
	    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
	    'Aboriginal people of the area. It has many springs, waterholes, '+
	    'rock caves and ancient paintings. Uluru is listed as a World '+
	    'Heritage Site.</p>'+
	    '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
	    'http://en.wikipedia.org/w/index.php?title=Uluru</a> (last visited June 22, 2009).</p>'+
	    '</div>'+
	    '</div>';
	return 	contentString;
}

function getInfoContentFromDb(){
	//function that gets the title and info content of a marker from the database.
}

function updateInfoWindow(marker_id,is_aux_marker){
	//marker that gets a marker id and updates the infowindow text updated
	
	if (is_aux_marker) { //if we have aux_marker then we dont get content from db
		infowindow.setContent(getInfoContent())		
	}
	else{
		infowindow.setContent(getInfoContentFromDb())			
	}
}

function addMarker(marker_data){
	//function that updates the title and shows the marker created previously (aux_marker)
	//marker_data = {'lat':40.463667, 'lng':3.74922};
	
	fake_title = "This is some fake title";
	aux_marker.setTitle(fake_title);
	aux_marker.setMap(map);
	
	updateInfoWindow(aux_marker,true); 
	
	//since we just created the marker, we open it.
	infowindow.open(map,aux_marker);

	google.maps.event.addListener(aux_marker, 'click', function() {
	  infowindow.open(map,aux_marker);
	});
}

function saveMarker(){
	$.post("http://localhost:8888/index.php/marker/add", {'lat' :  40.463667, 'lng' : -3.74922, 'icon': 'test icon sent2'}, //nom1 es el nombre del parámetro que pasaremos algo similar a nom1=valor1&nom2=valor2
	    function(data)
	    {
	        $.each(data.items, function(i,item){
	            alert("Post succeded!!!");
				//alert("valor: "+item.value+" nombre: "+item.name); //item.value e item.name porque
	            //en el objeto data la información se organiza de la forma [{value:name},{value:name}...]
	        });
	    }, "json"
	 );
	
}

function loadMarkers(){
	//function that loads all the markers of the db
	$.getJSON("http://localhost:8888/index.php/marker/all",function(markers_received) {

		//loop through the markers and add them
		//alert("Size of markes:"+markers_received.length);
		
		for (var key in markers_received){
			//alert(markers_received[key]);
			addMarker(markers_received[key]);
		}
		//$('.result').html(data);
	});
		
}


function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
