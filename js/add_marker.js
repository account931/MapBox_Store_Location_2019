//Saves new location via ajax. Fires when used click on any free space on map and  "Save Location"
//https://docs.mapbox.com/api/maps/#datasets


(function(){ //START IIFE (Immediately Invoked Function Expression)

  $(document).ready(function(){
	
	
	/*
	//retrieveFeature(); //gets one single feature from Datasets
	
	//retrieve feature, gets one single feature from Datasets, Working!!!
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
	*/
	
	
	
	
	
	
/*	
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
*/
	
	
	
	
	
	
	 // Show modal window with inputs to save a new marker
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
    $(document).on("click", '#savePlace', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	   
	    $("#myModalZ").modal("show");
		   
	});//end click
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	//END // Show modal window towith iptuts to save new marker
		
		
		
	
	
	
    // Save place to Dataset (from modal window, according to form inputs). Sends ajax to /ajax_php_scripts/add_marker_php.php which uses logic is in /Classes/AddMarker.php
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
    $(document).on("click", '#savePlaceFinal', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	   $("#myModalZ").modal("hide"); //hide modal window
	   sendAjax_saveMarker();  //Sends ajax to /ajax_php_scripts/add_marker_php.php which uses logic is in /Classes/AddMarker.php
	      
	  
		//save logic...........
		//ajax request to http://localhost/MapBox_Store_Location_2019/ajax_php_scripts/add_feature.php
		//add modal window,pass secret_token, coords, fields from form 
		   
	});//end click
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	//END Save place to Dataset	
		
		
	

   


	
	
	
	
	
	//show or hide preloader(on save or delete)
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
	
	
	
	
	
	
	
	//sends ajax to /ajax_php_scripts/add_marker_php.php which uses logic is in /Classes/AddMarker.php
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function  sendAjax_saveMarker(){
		if(($("#formLocationName").val()=="")||($("#formDescription").val()=="")){ //if empty fields
			alert("Can not be empty");
			$("#myModalZ").modal("show");
			return false;
		}
		
		var coordzLng = clickedCoords.lng;
		var coordzLat = clickedCoords.lat;
		//alert(JSON.stringify(clickedCoords));
		//return false;
		
		$.ajax({
	         url:'ajax_php_scripts/add_marker_php.php', 
          
			
			type: 'GET', //if {POST} it gets CORS error
			dataType: 'json', // without this it returned string(that can be alerted), now it returns object

			//passing the city
            data: { coordsLNG: clickedCoords.lng, //clicked coords from js/mapbox_store_location.js->{map.on('click', function (e) { }
			        coordsLAT: clickedCoords.lat,
					markerName:$("#formLocationName").val(),
					markerDesc:$("#formDescription").val(),
			},

            success: function(data) {
                // do something;
				//alert(JSON.stringify(data));
				console.log(data);	
                displayStatus("#techInfo", data, "null"); //techInfo window display
				scroll_toTop(); //scroll to top
                showPreloader("Saving");  //show preloader
				
                if(typeof markerZ !== 'undefined'){ //hide marker with "Save option"
		            markerZ.remove();
	            }
				$("#ETA").html("<h5 class='red'>Marker has been saved!!!!!!<span class='close-eta'>X</span></h5>"); //tempo use #ETA
				
				//calls the function
                gets_Dataset_features_from_API(); //refresh map markers , function from js/mapbox_store_location.js
				
				//smoothly recenter the map to a new saved marker coordinates, var map is from /js/mapbox_store_location.js----------
				setTimeout(function(){ //delay 5sec to see effect of recentring after preloader fades
				map.flyTo({
					center: [clickedCoords.lng, clickedCoords.lat],
					zoom: 14,
                    bearing: 0, speed: 0.2, // make the flying slow
                    curve: 1, // change the speed at which it zooms out
					});
				}, 5000);
				//END recenter the map to a new saved marker coordinates--------
				
                return true;				
				
            },  //end success
			error: function (error) {
				alert("adding marker error-> " + error);
            }	
        });
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	

  });
  // end ready	
	
	
	
}()); //END IIFE (Immediately Invoked Function Expression)
