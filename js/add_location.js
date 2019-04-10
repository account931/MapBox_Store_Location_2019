//Saves new location via ajax. Fires when used click on any free space on map and  "Save Location"


(function(){ //START IIFE (Immediately Invoked Function Expression)

  $(document).ready(function(){
	
	
	
	
    // Save place to Dataset
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
    $(document).on("click", '#savePlace', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	   
	   showPreloader("Saving");  
		
		//save logic...........
		   
	});//end click
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	//END Save place to Dataset	
		
		
	

   
   
    //Delete place from Dataset
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
    $(document).on("click", '#deletePlace', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	   
	   showPreloader("Deleting");  
		
		//delete logic...........
		   
	});//end click
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	//END //Delete place from Dataset	


	
	
	
	
	
	//show or hide preloader
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function showPreloader(text){
		//Blurs the background + shows gif loader
	    $('.App').addClass('blur');  //blur the background
		$('#save_delete_text').html(text);
		$(".error-parent").show(); //show error gif from <Error/>
		
		setTimeout(function(){
            $('.App').removeClass('blur'); //removes blur from background
			$(".error-parent").hide(1000); //hide error gif from <Error/>
        }, 4000); // A delay of 1000ms
		//END Blurs the background + shows gif loader   
	}
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	

  });
  // end ready	
	
	
	
}()); //END IIFE (Immediately Invoked Function Expression)
