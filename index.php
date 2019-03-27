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
	  
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	 

      <link rel="stylesheet" type="text/css" media="all" href="css/mapbox_store_location.css">
	  
      <script src="js/mapbox_store_location.js"></script><!--  Core Mapbox JS-->
	  <script src="js/changeStyleTheme.js"></script> <!-- change wallpapers,changeStyleTheme JS-->
	  
	 
	  <meta name="viewport" content="width=device-width" />
	  
	  <!--Favicon-->
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

     </head>

     <body>  
	 
	





       <div id="headX" class="jumbotron text-center gradient alert-success my-background head-style" style =' background-color:lavender ;'> <!--#2ba6cb;-->
         <h1 id="h1Text"> <span id="textChange"> MapBox Store Loaction 2019</span> <i class='fa fa-music' style='font-size:46px;'></i>  </h1> 
		 
		 <!------------------ MP3 PLAYER DEACTIVATED, MOVED DOWN ------------------><!-- class="control-play-pause-EQ" is common for player and all songList to trigger changing Play/Pause Icon and hide/show EQ-->
		 <!--
		 <p id="playerSongTitleR" class="" style="height:1.4em;"></p>
		  <audio id="audioR" class="styleme control-play-pause-EQ" width="320" height="240" controls>   
              <source src="" type="audio/mp3">
		  </audio>
		  -->
		  <!------------------ MP3 PLAYER ------------------>
		  
		<!--<img src="images/radio.png" alt="eq" class="eqHeader"/>-->
	   </div>



       
         <div class="wrapper grey">
    	     <div class="container">
		         <div class="row row1">
			 
			     
					 
			  
			        	
			        
				 
				 
				 
				      <!-------------- Mp3 files list------------->
				    
				          <div class="col-sm-12 col-xs-12 " id="mp3Result">
						      <?php
							      include '/Classes/autoload.php'; //uses autoload instead of manual includin each class-> Error if it is included in 2 files=only1 is accepted
							      include 'Classes/MpServerList.php';
								  $mpObject = new MpServerList();
								  $mpObject->getMp3List("mp3");
							  ?>      
				          </div>
				          <br><br><br>
				      <!-------------- END  Mp3 files list------------->
				 
				 
				  
				  
				
	 
	 
	 
	 
				   
				   
			      </div>  <!-- END class="row row1"> here, to make sure QR img appears on the same line in desktop-->
				  
				  
				  
				  
				  
				
				
				
				
              
	 
	 
    		</div><!-- /.container -->	  		
         </div><!-- /.wrapper -->
        
                
          <br><br><br> <br><br><br>

				
    	          
    	
		
		
		
			      <!-----------------  Button to change Style theme------------------------->
	              <input type="button" class="btn" value=">>" id="changeStyle" style="position:absolute;top:0px;left:0px;" title="click to change theme"/>
	              <!-----------------  Button to change Style theme------------------------->
				  
				  
				  
				  
				  <!------------------- Checkbox REPLAY LOOP,repeat one song, absolute position, top left ------------------->
				  <div style="position:absolute; top:60px; left:1px;" title="Loop">
				   &nbsp;&nbsp;<br>
				  <label class="switch">
                      <input type="checkbox" id="myCheck">
                          <span class="slider round"></span>
                  </label> 
				  <!--<i class="fa fa-rotate-right" style="font-size:30px;margin-left:20px;"></i>-->
				  </div>
                  <!------------------- Checkbox REPLAY LOOP, absolute position, top left ------------------------------------->
				  
				  
				  
				 <!---------------------------------- MP3 PLAYER FIXED POSITION--------------------------->
				 <div class="col-sm-12 col-xs-12" style="position:fixed; bottom:0px;">
				   <center>
		             <p id="playerSongTitle" class=""></p>
		                 <audio id="audio" class="styleme control-play-pause-EQ" width="320" height="240" controls>   <!-- class="control-play-pause-EQ" is common for player and all songList to trigger changing Play/Pause Icon and hide/show EQ-->
                             <source src="" type="audio/mp3">
		                 </audio>
					</center>
				 </div>
		         <!--------------------------------- MP3 PLAYER FIXED POSITION ----------------------------->
				 
				 
				 
				 <!---------------------------------- Link to upload mp3--------------------------->
				 <p class="upload"><a class="" href="admin/Classes/authentication.php">Upload mp3</a></p> <!-- Link to upload-->
				  
				  
				  
		
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
      include("Classes/RecordTxt.php"); //using autoload instead of it
      //RecordTxt::RecordAnyInput(array(/*$user*/), 'recordText/mapbox.txt');// Record  to  text;
//End  Record;
?>
