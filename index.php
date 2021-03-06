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
	  <link rel="stylesheet" type="text/css" media="all" href="css/infoBox.css">  <!-- infoBox CSS-->
	  <link rel="stylesheet" type="text/css" media="all" href="css/preloader.css">  <!-- Preloader CSS-->
	  
	 <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script> <!-- Mapbox L JS -->
     <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' /> <!-- Mapbox L JS -->
	 
	 
	  <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>-->
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	  <script src="Credentials/api_access_token.js"></script><!--  MapBox Access token -->
      <script src="js/mapbox_store_location.js"></script><!--  Core Mapbox JS -->
	  <script src="js/changeStyleTheme.js"></script> <!-- change wallpapers,changeStyleTheme JS-->  
	  <script src="js/check_gps_connection.js"></script> <!-- check_gps_connection JS-->
	  <script src="js/direction_api.js"></script> <!-- Direction API JS-->
	  <script src="js/add_marker.js"></script> <!--Saves Location/marker/feature to DATASET API JS (uses ajax)-->
	  <script src="js/delete_marker.js"></script> <!-- Deletes Location/marker/feature from DATASET API JS (uses ajax)-->
	 
	  <meta name="viewport" content="width=device-width" />
	  
	  <!--Favicon-->
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

     </head>

     <body>  
	 
	





       <div id="headX" class="jumbotron text-center gradient alert-success my-background head-style" style ='background-color:#2ba6cb;'> <!--#2ba6cb;-->
         <h1 id="h1Text"> <span id="textChange"> MapBox Store Location 2019</span></h1> 
         <span id="start_end_direction_info"></span> <!-- start/end coordinates for direction API-->	
         
		  <!-- SELECT Dropdown for markers -->
          <p id="markerDropdown"></p>	
          <!-- END SELECT Dropdown for markers -->		  
		  
	   </div>
       
         <div class="wrapper grey App">
    	     <div class="container">
		         <div class="row row1">
			 
				 
				 
				      
				    
				        
					  
					  
				 
				      <!-------------- Mapbox main window ------------->
				          <div class="col-sm-12 col-xs-12" id="">
						      <div id='ETA' class="col-sm-6 col-xs-6"></div>  <!---- ETA hidden window ------>
						      <div id='map' style='width: 80%; height: 400px;'></div> <!-- Maps Window goes here -->
							  <pre id='info'></pre> <!-- Mouse coords go here -->
				          </div>
				          <br><br><br>
				      <!-------------- END  Mapbox main window ------------->
				 
				 
				 
				      <!-------------- Matrix window(distance details between two points) ----------------->
				          <div class="col-sm-12 col-xs-12 bordered" id="matrixWindow">
				          </div>
				      <!-------------- END  Matrix window(distance details between two points) ------------->
				 
				 
				 
				       <!-------------- Turn by turn instructions ----------------->
				          <div class="col-sm-12 col-xs-12" id="instructions">
				          </div>
				      <!-------------- END Turn by turn instructions ------------->
					  
					  
					  
				      
					  <!-------------- Contol buttons ----------------->
					      <br><br>
				          <div class="col-sm-12 col-xs-12" id="">
						  <button> Draw route btw 2 points</button>
						  <button> GPS on</button>
						  <button> Clear layer</button>
						  <button> Clear InfoDivs</button>
				          </div>
				          <br>
				      <!-------------- END Contol buttons ------------->
				 
				 
				 
				   
				      <!-------------- infoBox, display the status of running proccess, shows info on black background ----------------->
				      <div id="infoBox" class="col-sm-8 col-xs-8">
					      <span class="close-span iphoneX">x</span>  
					  </div>
					  <!-------------- END infoBox, display the status of running proccess, shows info on black background ----------------->
					  
					  
					  
					  
					  <!-------------- infoBox, display the status of running, shows info ----------------->
				      <div id="techInfo" class="col-sm-12 col-xs-12">
					      <h3>Tech Info</h3>
					  </div>
					  <!-------------- END infoBox, display the status of running, shows info ----------------->
					  
					  
					  

					  
				   
			      </div>  <!-- END class="row row1"> -->
				  

	 
    		</div><!-- /.container -->	  		
         </div><!-- /.wrapper -->
        
               

			   
			   
			   
			   
		 
		 
		 
	<!-----------------  Modal window "Add marker" with info and fields to put Name and Description------------------------------>
      <div id="myModalZ" class="modal fade" role="dialog">
          <div class="modal-dialog">
          <!-- Modal content-->
              <div class="modal-content">
                  <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal">&times;</button>
                       <h4 class="modal-title">Save location to markers </h4>
                  </div>
                  <div class="modal-body">
				      <center>
				      <img src="images/location.svg" alt="img"/ class="img-small"><br> 
                      <p><br><br>
							<label for="formLocationName">Location name:</label>
                            <input type="text" class="form-control inputZ" id="formLocationName">
							<br>
		                    <label for="formDescription">Location description:</label>
                            <input type="text"class="form-control inputZ" id="formDescription">
							<br>
		                    
							<br>
					  </p>
					  </center>
                  </div>
                  <div class="modal-footer">
				       <!----- CheckBox to save in $_Cookies[] ----->
					   <input type="checkbox" name="cookies" id="checkX" value="saveCookies" checked>Keep in history(cookies)<br><br>
				       <button type="button" class="btn btn-default" id="savePlaceFinal">Save</button>
                       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
              </div>

         </div>
     </div>
   <!-----------------  END Modal window "Add marker" with info and fields to put Name and Description ---------------------------->
			   
			   
			   
			   
			   
			   
	<!-----------------  Modal window "INFORMATION" shows list of all Dataset markers ----------------------------->
      <div id="myModalInfo" class="modal fade" role="dialog">
          <div class="modal-dialog">
          <!-- Modal content-->
              <div class="modal-content">
                  <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal">&times;</button>
                       <h4 class="modal-title">List of your Datasets Markers </h4>
                  </div>
                  <div class="modal-body">
				      <center>
				      <img src="images/places.jpg" alt="img"/ class="img-small"><br> <br>
					  
					  
					  <p>Please know, you can use MBox API asserts with your markers stored in Dataset API at this page</p>
	                  <p>You can add your personal markers to Dataset API, delete them, draw the route between two markers and calculate ETA and distance</p>
	  
	                  <p>1. To add your personal marker, please click any place at map and select an option to add a marker</p>
	                  <p>2. To delete your personal marker, please click the marker and select an option to delete a marker </p>
	                  <p>3. To calcuate ETA and distance between two personal markers and draw a route, please select start and stop destination by clicking "Add to route" </p>
	                  <p>4. To hide a drawn route and distance info, please click "Clear" </p>
	                  <br></hr class="red">
					  
					  <!-- List of markers-->
                      <p id="list_of_markers" style="text-align:left;">
							<!-- here goes JS List -->
					  </p>
					  </center>
                  </div>
                  <div class="modal-footer">
				       
                       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
              </div>

         </div>
     </div>
   <!-----------------  END Modal window "INFORMATION" shows list of all Dataset markers ---------------------------->   
			   
			   
			   
			   
			   
			   
			   


           <!----------- Hidden preloader indicator when saving, hidden by default, must be outside class="App"  ------>
					  <div class="error-parent">
					      <h2 id="save_delete_text">  </h2>
		                  <span id='error_loading'>
			                  <img src="images/loader.gif"  class="error-img" alt="logo" />  
		                  </span>  
		              </div>
			<!----------- Hidden loading copy indicator ------->


					  
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
				  
				  
				 
				  
				  
				
				 
				   <!-----------------  Button with info------------------------------------>
	               <!--data-toggle="modal" data-target="#myModalZ" is a Bootstrap trigger---->
	               <button data-toggle="modal" data-target="#myModalInfo" class="btn" style="font-size:17px; position:absolute;top:0px;right:0px;" title="click to see info">
	               &nbsp;<i class="fa fa-info-circle"></i>&nbsp;
	               </button>    
	               <!-----------------  Button with info------------------------------------>
	   
	   
				 
				 <!---------------------------------- Link to show/hide markers--------------------------->
				 <p class="upload"><a class="iphoneX" id="markerShowHide" href="#">Hide marks</a></p> <!-- Link to upload-->
				  
				  
				  
		
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
