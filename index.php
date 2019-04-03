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
      <link rel="stylesheet" type="text/css" media="all" href="css/mapbox_store_location.css"> <!-- main CSS-->
	  <link rel="stylesheet" type="text/css" media="all" href="css/switch_checkbox.css">  <!-- switch checkbox CSS-->
	  
	 <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script> <!-- Mapbox L JS -->
     <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' /> <!-- Mapbox L JS -->
	 
	 
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	  <script src="Credentials/api_access_token.js"></script><!--  MapBox Access token -->
      <script src="js/mapbox_store_location.js"></script><!--  Core Mapbox JS -->
	  <script src="js/changeStyleTheme.js"></script> <!-- change wallpapers,changeStyleTheme JS-->
	 
	  <meta name="viewport" content="width=device-width" />
	  
	  <!--Favicon-->
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

     </head>

     <body>  
	 
	





       <div id="headX" class="jumbotron text-center gradient alert-success my-background head-style" style ='background-color:#12ba18;'> <!--#2ba6cb;-->
         <h1 id="h1Text"> <span id="textChange"> MapBox Store Location 2019</span></h1> 
		 
	   </div>
       
         <div class="wrapper grey">
    	     <div class="container">
		         <div class="row row1">
			 
				 
				 
				      <!-------------- Mapbox main window ------------->
				    
				          <div class="col-sm-12 col-xs-12 " id="">
						      <div id='map' style='width: 80%; height: 400px;'></div> <!-- Maps Window goes here -->
							  <pre id='info'></pre> <!-- Mouse coords go here -->
				          </div>
				          <br><br><br>
				      <!-------------- END  Mapbox main window ------------->
				 
				 
				 
				      <!-------------- Matrix window(distance details between two points) ----------------->
				          <div class="col-sm-12 col-xs-12 " id="matrixWindow">
				          </div>
				          <br><br>
				      <!-------------- END  Matrix window(distance details between two points) ------------->
				 
				 
				      
					   <!-------------- Contol buttons ----------------->
				          <div class="col-sm-12 col-xs-12 " id="">
						  <button> Draw route btw 2 points</button>
						  <button> GPS on</button>
						  <button> Clear layer</button>
				          </div>
				          <br>
				      <!-------------- END Contol buttons ------------->
				 
				   
				   
			      </div>  <!-- END class="row row1"> -->
				  

	 
    		</div><!-- /.container -->	  		
         </div><!-- /.wrapper -->
        
                
          <br><br><br> <br><br><br>

				
    	          
   	
		
			      <!-----------------  Button to change Style theme------------------------->
	              <input type="button" class="btn" value=">>" id="changeStyle" style="position:absolute;top:0px;left:0px;" title="click to change theme"/>
	              <!-----------------  Button to change Style theme------------------------->
				  
				  
				  
				  <!------------------- Checkbox Direction MODE, absolute position, top left ------------------->
				  <div style="position:absolute; top:40px; left:1px;" title="Direction Mode">
				   &nbsp;&nbsp;<br>
				  <label class="switch">
                      <input type="checkbox" id="myCheck">
                          <span class="slider round"></span>
                  </label> 
				  <!--<i class="fa fa-rotate-right" style="font-size:30px;margin-left:20px;"></i>-->
				  </div>
                  <!-------------------  END Checkbox Direction MODEP, absolute position, top left ------------------------------------->
				  
				  
				 
				  
				  
				
				 
				 
				 
				 <!---------------------------------- Link to upload mp3--------------------------->
				 <p class="upload"><a class="" href="admin/Classes/authentication.php">Upload POI</a></p> <!-- Link to upload-->
				  
				  
				  
		
		          <!------------- Footer ------------->
				  <div class="footer "> <!--navbar-fixed-bottom  fixxes bootom problem-->
				      Contact: <strong>@gmail.com</strong><br>
					  <?php  echo date("Y"); ?>
				  </div>
		          <!------------ END Footer ----------->  
		
		

		
		
		
		
     
	  
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
