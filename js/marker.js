//`id`,`time_created`,`lat`,`lng`,`icon`,`draggable`,`animation`,`onclick`,`link`,`user`,`title`,`content`,`fuente`,


function createMarker(marker_data) {
	//function that given some marker data creates the marker
	
	//check if we have a title
	if (marker_data.title === undefined ) {
	      title = 'empty title'; //FIXME, we always need a title
	}else{
		title = marker_data.title;
	};
	
	//check if we have lat & lng or latlng combined (google.maps.LatLng object)
	if (marker_data.lng === undefined || marker_data.lat === undefined){
		if(marker_data.latlng ===undefined){
			alert("error we cannot set marker, empty coordinates");
		}else{
			marker_position	= marker_data.latlng;
		}
	}else{
		marker_position = new google.maps.LatLng(marker_data.lat, marker_data.lng);  //next to Islas Canarias, south west limit of box
	}
	
	var marker = new google.maps.Marker({
		position: marker_position,
		map: map,
		title: title
	});
	
  	google.maps.event.addListener(marker, 'click', function() {
//		updateInfoWindow(marker_data.id,false);
		infowindow.setContent(getInfoContent(marker_data));		
		infowindow.open(map,marker);
	});
	return marker;
}

function createTempMarker(content_text,content_title, content_link){
	//function that adds a marker when pressing the button "Add to map"
	if (!content_link){
		content_link = "";
	}
	
	temp_title=content_title;
	temp_text=content_text;
	temp_marker_data = {'latlng':temp_location, 'content':content_text, 'title':content_title, 'link':content_link};
	temp_marker = createMarker(temp_marker_data);
	toggleBounce(temp_marker);	
}

function saveMarker(marker_data){
	//function that saves a marker in the db
	$.post("http://localhost:8888/index.php/marker/add",marker_data, 
	    function(data)
	    {
			alert("Post succeded!!!");
			alert(data);
	        //$.each(data.items, function(i,item){
	            alert("Post succeded!!!");
				//alert("valor: "+item.value+" nombre: "+item.name); //item.value e item.name porque
	            //en el objeto data la información se organiza de la forma [{value:name},{value:name}...]
	        //});
	    }, "json"
	 );	
}

function saveTempMarker(){
	temp_zoom=map.getZoom();
	//function that saves the temp marker data by sending it to the database and then stops the bouncing
	temp_data={"lat":temp_lat,"lng":temp_lng,"title":temp_title,"content":temp_content,"fuente":"Test fuente","zoom":temp_zoom},   //add icon
	saveMarker(temp_data);
	toggleBounce(temp_marker);
}

function toggleBounce(marker) {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
