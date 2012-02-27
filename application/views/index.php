<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>

	<style type="text/css">

	</style>
	<!--Needed for the map 	 -->
<!-- 	<?php echo $map_data['js']; ?> -->
	
	<!-- 	Css -->
	<link rel="stylesheet" type="text/css" href="css/main.css" />

	<!-- Get google library API 	 -->
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyDe_fp2YEScnQ-EA2VsmTMiYrcYfmjbk1k&sensor=false"></script>
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script> -->
	
		<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
  	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>

	<!-- <script type="text/javascript" src="/js/jquery.watermark.min.js"></script> -->

	
    <script type="text/javascript" src="js/lonoto.js"></script>
    <script type="text/javascript" src="js/map.js">	</script>
	

</head>
<body onload="initialize()">

<div id="container">
	<h1>Welcome to Lonoto!</h1>
	
	<div id="form">
		</div>
		<div id="map_div">
			<button id="button_save">Save marker</button>
			<button id="button_load">Load marker</button>
			
			<div>
			    <label>Busca en el mapa </label>
				<br>
				<input class="watermark auto-focus" id="input_location" type="text" placeholder="Introduce una ciudad, una dirección...">
			</div>
			<div>
			    <label>Cuenta tu historia: </label>
				<br>
				<textarea class="watermark" id="input_story" type="text" placeholder="Introduce un link de una noticia, una historia personal...">
				</textarea>	
			</div>
			<button id="button_add" onclick="addMarker();">Añadir al mapa</button>
			<br>
			<input class="watermark" id="input_title" type="text" placeholder="Ponle un titulo y listo!">
			
			<br>
			<br>
			<br>
			
			<div id="map_canvas"></div>
			
	</div>
</div>

</body>
</html>