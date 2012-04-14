<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>
	<meta charset="utf-8" />
	<?php	$this->load->view('libs'); ?>
</head>

<!-- body	 -->
<body onload="initialize()">	
	
	<div id="box">
		<!-- header -->
		<?php	$this->load->view('header'); ?>
	
		<!-- slider markup -->
		<ul id="unoslider" class="unoslider">
			<li><img src="img/menu/1.jpg" /></li>
			<li><img src="img/menu/2.jpg" title="Image tooltip" /></li>
		</ul> 
		
		<!-- <div id="unoslider"><ul id='unoslider' class='unoslider'> 
		  		<li>
					<div class='unoslider_caption'>you can use any html markup here</div> 
					<img src='img/menu/corrupcion.jpg' />
				</li> 
		  		<li>
					<div class='unoslider_caption'>you can use any html markup here</div>
					<img src='img/menu/comparte.jpg' />
				</li> 
 				<li>
					<div class='unoslider_caption'>you can use any html markup here</div>
					<a href='something'><a href='something'><img src='img/menu/publica.png' /></a>
				</li> 
				<li>
					<div class='unoslider_caption'>you can use any html markup here</div> 
					<a href='something'><img src='img/menu/todos.jpg' /></a>
				</li> 
				<li>
					<div class='unoslider_caption'>you can use any html markup here</div> 
					<a href='something'><img src='img/menu/dinero.jpg' /></a>
				</li> 		
				<li>
					<div class='unoslider_caption'>you can use any html markup here</div> 
					<a href='something'><img src='img/menu/comparte.jpg' /></a>
				</li> 												
		  		<li>
					<div class='unoslider_caption'>you can use any html markup here</div> 
					<a href='something'><a href='something'><img src='/path/to/image.gif' /></a>
				</li>  -->
			<!-- </ul> -->
		<!-- </div>  -->
		
		
		<!-- slider initializer -->
		<script type='text/javascript'> 
		  $(document).ready(function(){ 
				$('#unoslider').unoslider({
					width: 700,
					height: 254
				});
		  }); 
		</script>
	
			    
		<div id="left_column">
			<h1>¡Bienvenido a Lonoto.org!</h1>	 
		
			<div class="userinput">
			    <label>Busca en el mapa </label>
				<br>
				<input class="watermark auto-focus" id="input_location" type="text" placeholder="Introduce una ciudad, una dirección...">
				<br>
				<br>

			</div>
			<div>
				<label>Pon titulo a tu historia: </label>
				<br>
				<input class="watermark" id="input_title" type="text" placeholder="Ponle un titulo	">
				<br>
			    <label>Cuenta tu historia: </label>
				<br>
				<textarea class="watermark" id="input_story" type="text" placeholder="Introduce un link de una noticia, una historia personal...">
				</textarea>	
			</div>
			<button id="button_add">Añadir al mapa</button>
			<button id="button_save">Guardar</button>
		
			<br>
		</div>
				
		<!-- <div class="right_column blueberry">
		  	<ul class="slides">
			    <li><img src="img/menu/corrupcion.jpg" /></li>
			    <li><img src="img/menu/comparte.jpg" /></li>
			    <li><img src="img/menu/publica.png" /></li>
			    <li><img src="img/menu/todos.jpg" /></li>
			    <li><img src="img/menu/dinero.jpg" /></li>			
			  </ul>
			  <ul class="pager">
			    <li><a href="#"><span></span></a></li>
			    <li><a href="#"><span></span></a></li>
			    <li><a href="#"><span></span></a></li>
			    <li><a href="#"><span></span></a></li>
			  </ul>
		</div>			 -->
		
		<div id="map_canvas"></div>
		</div>
		<!-- Footer -->
		<?php	$this->load->view('footer'); ?>
	</div>	
	</body>
</html>