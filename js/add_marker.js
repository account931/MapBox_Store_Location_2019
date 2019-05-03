//Saves new location via ajax. Fires when used click on any free space on map and  "Save Location"
//https://docs.mapbox.com/api/maps/#datasets


(function(){ //START IIFE (Immediately Invoked Function Expression)

  $(document).ready(function(){
	
	
	
	//retrieveFeature();
	//retrieve feature 
	function retrieveFeature(){
	$.ajax({
	         url:'https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/5cfa32707c902a3231b5258e3b93f24b?access_token=' +  mapboxgl.accessTokenSecret, 
          //url: 'https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features?access_token=' + mapboxgl.accessToken,  //mapboxgl.accessToken is from Credentials/api-access_token.js
           //https://api.mapbox.com/datasets/v1/{username}/{dataset_id}/features/{feature_id}?access_token=YOUR_MAPBOX_ACCESS_TOKEN
			
			type: 'GET', //if {POST} it gets CORS error
			dataType: 'json', // without this it returned string(that can be alerted), now it returns object

			//passing the city
            data: { //serverCity:window.cityX
			},

            success: function(data) {
                // do something;
				alert(JSON.stringify(data));
				console.log(data);						
				
            },  //end success
			error: function (error) {
				alert("retrieve feature error-> " + error);
            }	
        });
	}
	//END retrieve feature 
	
	
	
	
	
	
	
	
//var dataX = '{"type": "Feature","properties": {"title": "School 7", "description": "School 7"},"geometry": {"coordinates": [28.655998, 50.267998],"type": "Point"}}';
	
var dataX = '{"id": "5cfa32707c902a3231b5258e3b93f24b","type": "Feature","geometry": {"coordinates": [28.655998, 50.267998],"type": "Point"}, "properties": {"title": "School 7", "description": "School 7"} }';	
	
//test insert a feature
 $.ajax({
	         url:'https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/5cfa32707c902a3231b5258e3b93f24b?access_token=' +  mapboxgl.accessTokenSecret, 
          //url: 'https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features?access_token=' + mapboxgl.accessToken,  //mapboxgl.accessToken is from Credentials/api-access_token.js
           //https://api.mapbox.com/datasets/v1/{username}/{dataset_id}/features/{feature_id}?access_token=YOUR_MAPBOX_ACCESS_TOKEN
          //https://cors-anywhere.herokuapp.com/

			
			type: 'PUT', //if {POST} it gets CORS error
			dataType: 'jsonp', // without this it returned string(that can be alerted), now it returns object
			crossDomain:true,
			//passing the city
            data: JSON.stringify(dataX),//{ //serverCity:window.cityX},
			//data: {body: JSON.stringify(dataX)},
			contentType: "application/json; charset=utf-8", // this
			//headers:{"Content-Type": "application/json"},
            success: function(data) {
                // do something;
				alert(JSON.stringify(data));
				console.log(data);						
				
            },  //end success
			error: function (error) {
				alert("Feature insert error-> " + error);
				console.log(error);
				//$("#weatherResult").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO CITY FOUND</h4>")}).fadeIn(2000);
            }	
        });
//END test insert a feature 

	
	
	
	
	
    // Save place to Dataset
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
    $(document).on("click", '#savePlace', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	   
	   showPreloader("Saving");  
		
		//save logic...........
		//ajax request to http://localhost/MapBox_Store_Location_2019/ajax_php_scripts/add_feature.php
		//add modal window,pass secret_token, coords, fields from form 
		   
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
