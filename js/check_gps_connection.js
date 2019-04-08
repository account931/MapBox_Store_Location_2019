//runs check if GPS is on/off + dispaly infoBox with status
(function(){ //START IIFE (Immediately Invoked Function Expression)

  $(document).ready(function(){
	
	
	
	
    //Checking if GPS is turned, checks when u click location UI button
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	//click on GPS UI Icon
    $(document).on("click", '.mapboxgl-ctrl-geolocate', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	/*
        navigator.permissions && navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
            if(PermissionStatus.state == 'granted'){
                //allowed
		         alert("GPS is OK");
            }else{
                //denied
		        alert("GPS is OFF. Turn it ON");
            }
        });
	 */
		run_gps_check();	
		
	});//end click
		
		
		
			





        
        //if tryGeolocation() fails
      var browserGeolocationFail = function(error) {
		  alert('GPS or Location permission is OFF. Turn it on.');  // will fire if GPS is off at cell, if no permission or if Chrome
		  displayStatus("#infoBox", " GPS or Location permission is OFF. Turn it on.", "red");
		  
		  
          switch (error.code) {
              case error.TIMEOUT:
                  alert("Browser GeoLoc error !\n\nTimeout.");
                  break;
              case error.PERMISSION_DENIED:
                  if(error.message.indexOf("Only secure origins are allowed") == 0) {
                      //tryAPIGeolocation();
					  //alert('!SSL permission denied'); //IMPORTANT ALERT
					  displayStatus("#infoBox", "!SSL permission denied", "null");
					  //infoWindow.setContent("Only secure origins are allowed");
					  //infoWindow.open(map);
                      
                  }
                  break;
              case error.POSITION_UNAVAILABLE:
                   alert("Browser geolocation error !\n\nPosition unavailable.");
                   break;
			  //mine-------------------------
			  case error.UNKNOWN_ERROR:
                  alert("An unknown error occurred.");
                  break;
           }
        };		
		
		
		
		
		
		
		
		var browserGeolocationSuccess = function(position){
		  latX =  position.coords.latitude; //mine
		  lonX =  position.coords.longitude;
          //alert("Core Performance successful!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude); //IMPORTANT ALERT
		  displayStatus("#infoBox", "Core Performance successful!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude, "null");
		  //recenterMap(latX,lonX, null);//mine, recenter the map if coords are found
        };
	  
	  
	  
	    
		function run_gps_check(){
		if (navigator.geolocation){
              navigator.geolocation.getCurrentPosition(
                  browserGeolocationSuccess,
                  browserGeolocationFail,
                  {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true}); //maximumAge: 50000 (50 sec of location cache)
         }
		}
		
		

       run_gps_check();		
  
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
    //END Checking if GPS is turned, checks when u click location UI button





	
	
	
	
	 var counterb = 1; //counter to encrease delays //used in displayStatus(myDiv, message, cssClass), declare it outside function to keep it static and save value of prev ++

	
	 //functions thats shows info of running(on black screen), instead of alerts, uses var counterb
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     ** 
	  function displayStatus(myDiv, message, cssClass)
	  {
		 
		  counterb++; //counter to encrease delays
		  var data =  $(myDiv).html(); //gets prev messages //TEMP NOT USED
		  var final = data + "<p class='" + cssClass + "'>" + message + "</p>";    //adds a new to prev  //TEMP NOT USED
		  //$(myDiv).hide().html(final).fadeIn(2000);  //disable for makes lines appear one by one with .append
		  
		  //$(myDiv).stop().fadeOut("slow",function(){ $(this).html(final)}).fadeIn(2000);
		  
		  $(myDiv).hide().fadeIn(2000); //makes div visible
		  
		  setTimeout(function(){     //each line appears with delay
		      $(myDiv).append("<p class='" + cssClass + "'>" + message + "</p>")   		  
		  }, counterb * 2000); //counterb * 1000 encreases the time for next line to appear
		  
		  
	  }
	  //END functions thats shows info of running, instead of alerts
	  
	  
	  
	  
	  
	  
	 //close infoBox
	 $(document).on("click", '.close-span', function() {  //newly generated, was not working beacuse of this
		   $("#infoBox").hide(900);
	 });
	 //close infoBox
	 
	  
	  
	  


  });
  // end ready	
	
	
	
}()); //END IIFE (Immediately Invoked Function Expression)
