//Deletes a marker/feature via ajax. Fires when used click "DELETE"
//https://docs.mapbox.com/api/maps/#datasets


(function(){ //START IIFE (Immediately Invoked Function Expression)

  $(document).ready(function(){
	
	
	

		
		
	 //When user click on marker and select "Delete" in prompt dialog, to delete marker/place from Dataset-> it shows prompt dialog
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
    $(document).on("click", '#deletePlace', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	    
		var clickedMarkerID = $(this).attr("data-coords"); //gets the data-coords attribute value, i.e the ID
		
		var isDelete = confirm("Sure to delete?"); //prompt dialog
		
		if(isDelete){ //if user confirms DELETE
			sendAjax_deleteMarker(clickedMarkerID); //pass the ID of marker to delete
		} else {
		}
		
	});//end click
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	//END //Delete place from Dataset	

	

		
	

   
 

	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	//sends ajax to /ajax_php_scripts/add_marker_php.php which uses logic is in /Classes/AddMarker.php
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function  sendAjax_deleteMarker(IDx){ //arg[IDx] is a marker ID to delete, passed in  Line 25 ->sendAjax_deleteMarker(clickedMarkerID); 
	
	    //alert("ins " + idz);
	
		$.ajax({
	         url:'ajax_php_scripts/delete_marker_php.php', 
          
			
			type: 'GET', //if {POST} it gets CORS error
			dataType: 'json', // without this it returned string(that can be alerted), now it returns object

			//passing the ID
            data: { markerID: IDx, //ID of clicked marker u wish to delete
			    },

            success: function(data) {
                // do something;
				alert(JSON.stringify(data));
				console.log(data);	
                displayStatus("#techInfo", "Marker is Deleted", "null"); //techInfo window display
				scroll_toTop(); //scroll to top
                showPreloader("Deleting");  //show preloader
				
               
			    /*if(typeof markerZ !== 'undefined'){ //hide TEMPO marker with "DELETE option"
		            markerZ.remove();
	            }*/
				
				 if(typeof markerZXX !== 'undefined'){ //hide DATASET marker with "DELETE option"
		            markerZXX.remove();
	            }
				
				
				$("#ETA").html("<h5 class='red'>Marker " + IDx + " has been deleted!<span class='close-eta'>X</span></h5>"); //tempo use #ETA
				
                gets_Dataset_features_from_API(); //refresh map markers , function from js/mapbox_store_location.js
			
			
				//smoothly recenter the map to a hardcored center after deletion
				setTimeout(function(){ //delay 5sec to see effect of recentring after preloader fades
				map.flyTo({
					center: [28.665445, 50.264004],
					zoom: 14,
                    bearing: 0, speed: 0.2, // make the flying slow
                    curve: 1, // change the speed at which it zooms out
					});
				}, 5000);
				//smoothly recenter the map to a hardcored center after deletion

			
				
            },  //end success
			error: function (error) {
				alert("deleting marker error-> " + error);
				alert(JSON.stringify(error));
            }	
        });
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	//show or hide preloader(on save or delete) -> COPY from add_marker.js
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function showPreloader(text){
		$("#infoBox").hide(); //hide blackinfobox, not to interfere with loader
		
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
