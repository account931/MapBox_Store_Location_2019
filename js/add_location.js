//Saves new location via ajax. Fires when used click on any free space on map and  "Save Location"


(function(){ //START IIFE (Immediately Invoked Function Expression)

  $(document).ready(function(){
	
	
	
	
    //
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	
	
	
    $(document).on("click", '#savePlace', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	   
	   //Blurs the background + shows gif loader
	    $('.App').addClass('blur');  //blur the background
		$(".error-parent").fadeIn(2500); //show error gif from <Error/>
		
		setTimeout(function(){
            $('.App').removeClass('blur'); //removes blur from background
			$(".error-parent").fadeOut(1000); //hide error gif from <Error/>
        }, 4000); // A delay of 1000ms
		//END Blurs the background + shows gif loader   
		
		//save logic...........
		   
	});//end click
		
		
		
	






  });
  // end ready	
	
	
	
}()); //END IIFE (Immediately Invoked Function Expression)
