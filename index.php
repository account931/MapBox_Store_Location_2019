<?php
ini_set('display_errors',1);
error_reporting(E_ALL | E_STRICT);
require 'vendor/autoload.php'; //Composer autoload
?>
<!doctype html>
<!--------------------------------Bootstrap  Main variant ------------------------------------------>
  <html lang="en-US">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Type" content="text/html">
      <meta name="description" content="Mp3 server" />
      <meta name="keywords" content="Mp3 server">
      <title>MapBox Store Loaction 2019</title>
  
      <!--Favicon-->
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <!-- fa-fa images library-->
      <link rel="stylesheet" type="text/css" media="all" href="css/mapbox_store_location.css">
	  
	 <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script> <!-- Mapbox L JS -->
     <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' /> <!-- Mapbox L JS -->
	 
	  <meta name="viewport" content="width=device-width" />
	  
	  <!--Favicon-->
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

     </head>

     <body>  
	 
	





       <div id="headX" class="jumbotron text-center gradient alert-success my-background head-style" style ='background-color:#2ba6cb;'> <!--#2ba6cb;-->
         <h1 id="h1Text"> <span id="textChange"> MapBox Store Loaction 2019</span></h1> 
		 
	   </div>
       
         <div class="wrapper grey">
    	     <div class="container">
		         <div class="row row1">
			 
				 
				 
				      <!-------------- Mapbox main window ------------->
				    
				          <div class="col-sm-12 col-xs-12 " id="mp3Result">
						      <div id='map' style='width: 80%; height: 400px;'></div> <!-- Maps go here -->
							  <pre id='info'></pre> <!-- Mouse coords go here -->
				          </div>
						  
<script>

mapboxgl.accessToken = 'pk.ey';
var map = new mapboxgl.Map({
container: 'map', // container id
center: [28.665445, 50.264004], // starting position [lng, lat]
zoom: 13, // starting zoom
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
//style: 'mapbox://styles/mapbox/satellite-v9'
});


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());




//JSON DATA
var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [28.674557, 50.265412]
    },
    properties: {
      title: 'Mapbox pop-up 1',
      description: 'Zhytomyr test marker',
	   /* icon: {
        iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
        className: 'dot'
      }
	  */
	  
	  
    }
  },
  //end of marker 1
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [28.665445, 50.264004]
    },
    properties: {
      title: 'Mapbox pop-up 2',
      description: 'Zhytomyr, test marker'
    }
  }]
};








// add markers to map
geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
	.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
    .addTo(map);
});





//Get coordinates onMouse
map.on('click', function (e) {  //mousemove
document.getElementById('info').innerHTML =
// e.point is the x, y coordinates of the mousemove event relative
// to the top-left corner of the map
JSON.stringify(e.point) + '<br />' +
// e.lngLat is the longitude, latitude geographical position of the event
JSON.stringify(e.lngLat);
});
</script>
						  
				          <br><br><br>
				      <!-------------- END  Mapbox main window ------------->
				 
				   
			      </div>  <!-- END class="row row1"> here, to make sure QR img appears on the same line in desktop-->
				  

	 
    		</div><!-- /.container -->	  		
         </div><!-- /.wrapper -->
        
                
          <br><br><br> <br><br><br>

				
    	          
   	
		
			      <!-----------------  Button to change Style theme------------------------->
	              <input type="button" class="btn" value=">>" id="changeStyle" style="position:absolute;top:0px;left:0px;" title="click to change theme"/>
	              <!-----------------  Button to change Style theme------------------------->
				  
				  
				  
				  
				 
				  
				  
				
				 
				 
				 
				 <!---------------------------------- Link to upload mp3--------------------------->
				 <p class="upload"><a class="" href="admin/Classes/authentication.php">Upload POI</a></p> <!-- Link to upload-->
				  
				  
				  
		
		          <!------------- Footer ------------->
				  <div class="footer "> <!--navbar-fixed-bottom  fixxes bootom problem-->
				      Contact: <strong>@gmail.com</strong><br>
					  <?php  echo date("Y"); ?>
				  </div>
		          <!------------ END Footer ----------->  
		
		

		
		
		
		
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <script src="js/mapbox_store_location.js"></script><!--  Core Mapbox JS -->
	  <script src="js/changeStyleTheme.js"></script> <!-- change wallpapers,changeStyleTheme JS-->
	  
    </body>
</html>





<?php

// Record (with CLASS) all the  input  to  txt;  //;
      //include("Classes/RecordTxt.php"); //using autoload instead of it
	   //Namespace variant_1----------
	   //Bellow is working Namespace usage
	   //use Cubet\RecordTxt as Dima;
       //Dima::RecordAnyInput(array(/*$user*/), 'recordText/mapbox.txt'); // Record  to  text;
	   
//End  Record;
?>
