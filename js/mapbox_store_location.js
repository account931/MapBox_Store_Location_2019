var clickedCoords; //coords of clicked place, global to use in ajax to pass to /ajax_php_scripts/add_marker_php.php which uses logic is in /Classes/AddMarker.php
var map; //global to use in direction-api.js
var popuppZ; //global to use in direction-api.js
var markerZ; //global var  to be able remove prev markers (in js/add_marker.js or js/delete_marker.js)

var gets_Dataset_features_from_API; //function to get Dataset markers values from Dataset //we use here Function Expression to pass the name of the function(declared here outside IIFE) to a different js script (js/add_marker.js)
var currentMarkers=[]; //array that contains all added markers, in order to be able to remove them
var scrollResults; //global Function to scroll to certain div, it is global & outof IIFE to use in other scripts
var scroll_toTop;  //global Function to scroll the page to top, it is global & outof IIFE to use in other scripts


(function(){ //START IIFE (Immediately Invoked Function Expression)

$(document).ready(function(){
	
var DIRECTION_MODE = false;	 //mine, activated in checkbox switch top left
	
	
	
	
	
//Access api key is in Credentials/api_access_token!!!!
//Creats map with center
/*var*/ map = new mapboxgl.Map({
container: 'map', // container id
center: [28.665445, 50.264004], // starting position [lng, lat]
zoom: 13, // starting zoom
style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
//style: 'mapbox://styles/mapbox/satellite-v9'
});


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());



//Geolocation button control to add to map
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,  //If  true the Geolocate Control becomes a toggle button and when active the map will receive updates to the user's location as it changes. I.e monitors when user changes location
    showUserLocation: true //by default it is true, show a dot where the user's location is
	}));
//END Geolocation button control to add to map









/*
map.on('load', function() {
    map.addSource("mydata", {
        type: "geojson",
        data: "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features?access_token=pk.eyJ1IjoiYWNjb3VudDkzMSIsImEiOiJjaXgwOTVuOTEwMGFxMnVsczRwOWx0czhnIn0.YjZ5bpnh6jqTEk7cCJfrzw",
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 120
    });
	});
*/











//getting Dataset markers values from Dataset(initial several markers are created in Studio manually)
// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

gets_Dataset_features_from_API = function(){ //we use here Function Expression to pass the name of the function(declared here outside IIFE) to a different js script (js/add_marker.js)
   $.ajax({
            url: 'https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features?access_token=' + mapboxgl.accessToken,  //mapboxgl.accessToken is from Credentials/api-access_token.js
            //url:'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/28.684956,50.265008;28.662900,50.262885?access_token=' +  mapboxgl.accessToken, 
			
			type: 'GET', //if {POST} it gets CORS error
			dataType: 'json', // without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    //serverCity:window.cityX
			},
			cache: false, //MUST_HAVE option, it prevents caching, so u can add a new marker and it 'll appear immediately
            success: function(data) {
                // do something;
				//alert(JSON.stringify(data));
				console.log(data);
				convert_Dataset_to_map(data); //function that displays marker from data
				//alert("Map is Refreshed");
				
				
            },  //end success
			error: function (error) {
				alert("Dataset error-> " + error); 
				//$("#weatherResult").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO CITY FOUND</h4>")}).fadeIn(2000);
            }	
        });
//END getting Dataset markers values
}
// **                                                                                  **
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************




//calls the function; we use here Function Expression to pass the name of the function(declared here outside IIFE) to a different js script (js/add_marker.js)
gets_Dataset_features_from_API();







//NOT USED -> switched to Datasets //JSON DATA -> used to be just object with predifined coords to add markers to map onLoad
//NOT USED -> switched to Datasets
/*
var geojson_PREV = {
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
	    //icon: {
          //iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
          //iconSize: [50, 50], // size of the icon
          //iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
          //popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
          //className: 'dot'
        //}
	  
	  
	  
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
*/
//END NOT USED -> switched to Datasets //JSON DATA -> just object with coords to add markers to map onLoad





//function to convert data received from Dataset to markers on map
function convert_Dataset_to_map(geojson){
	
	
     //removes all markers which are in array currentMarkers[]
     if (currentMarkers!==null) {
         for (var i = currentMarkers.length - 1; i >= 0; i--) {
             currentMarkers[i].remove();
         }  
     currentMarkers=[]; 		 
	 }
	//END removes all markers which are in array currentMarkers[]
	
	
	
	
     //add markers to map from predefined array{var geojson}
     geojson.features.forEach(function(marker) {

      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

     // make a marker for each feature and add to the map
     markerZ = new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
	.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3>' + 
	         '<p>' + marker.properties.description + '</p>' +
			 '<a href="#"><button class="btn btn-success">To route</button></a>&nbsp;' +  //id="addRoute"
			 '<a href="#"><button class="btn btn-danger" id="deletePlace" data-coords=' + marker.id + '>Delete</button></a>')) //assign a delete button data-coords with it's ID(to use in deletion)
    .addTo(map);
	
	currentMarkers.push(markerZ); //adds a currentle created marker to array in order to be able to remove them all from map
    });
}
// END add markers to map from predefined array{var geojson}












//On map click(om any empty place)-> Get coordinates + Place a marker to map + opens marker's pop-up automatically without clicking on marker-------------------------------------
//var markerZ; //global var  to be able remove prev markers

map.on('click', function (e) {  //mousemove 

	 
    //display/adds clicked coords to <div class="info">
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat);
	
	
	
	 //detects/checks if u not click on marker, if on marker - Stops everything
    var clickedEl = window.event ? event.srcElement : e.target;
    if (clickedEl.className && (" " + clickedEl.className + " ").indexOf(" marker ") != -1)   //marker is a class="marker"
	{
		alert("u clicked marker, not the map"); 
		
		 //removes prev marker if it was set by click
        if(typeof markerZ !== 'undefined'){
		    markerZ.remove();
	    }
		return false;
	}
	
	
	 //adding a  new generated marker to a clicked position(if u clicked on the map, not marker)
	 var el = document.createElement('div');
     el.className = 'marker markerAdded';  /* marker-clicked */ //class of created marker
	 var allMarkers = []; //not used???
	 
    //removes prev marker if it was set by click
    if(typeof markerZ !== 'undefined'){
		markerZ.remove();
	}
	
	
	//var for marker pop-uo
	//var popuppZ; //went outside IIFE
	
	clickedCoords = e.lngLat; //coords of clicked place
	
	 //Set data to new generated marker, when u click on any empty place on the map
	 /*var*/ markerZ = new mapboxgl.Marker(el)
         .setLngLat(e.lngLat)  //set coords
         .setPopup(popuppZ = new mapboxgl.Popup({ offset: 25 }) // add {var popuppZ} to be able to open it automatically
         .setHTML('<h3> Clicked Target </h3>' +
		          '<p>Save this point? <br><a href="#"><button class="btn btn-danger" id="savePlace">Save</button></a> '  +
				  '<a href="#"><button class="btn btn-success add-route-btn" id="addRoute"> Add to route</button></a>' +
				  //'<a href="#"><button> Set as end</a></button> </p>' +
				  '<p>' + e.lngLat + '</p>'))
         .addTo(map);
		 
		 currentMarkers.push(markerZ); //adds a currentle created marker to array in order to be able to remove them all from map
		 
		 popuppZ.addTo(map); //opens pop-up automatically, without clicking on the marker
		 
		 //show pop-up
		 // Populate the popup and set its coordinates
         // based on the feature found.
         /*new mapboxgl.Popup().
		 .setLngLat(e.lngLat)
         .setHTML("description")
         .addTo(map);
          */
    //allMarkers.push(markerZ); alert(allMarkers);
	
	//allMarkers[0].remove();
	
});
//---------------------------------------------------------------------------------------------------------------------------------








//gets distance details between two points
//getMatrix();  //!!!!!!!!!!!!!!!!!!!!!!!!!!!




//gets distance details between two points(does not draw route!!!!!!)
function getMatrix(){
	// send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving/28.684956,50.265008;28.662900,50.262885?approaches=curb;curb&access_token=' + mapboxgl.accessToken,  //mapboxgl.accessToken is from Credentials/api-access_token.js
            //url:'https://api.mapbox.com/optimized-trips/v1/mapbox/driving/28.684956,50.265008;28.662900,50.262885?access_token=' +  mapboxgl.accessToken, 
			
			type: 'GET', //if {POST} it gets CORS error
			dataType: 'JSON', // without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    //serverCity:window.cityX
			},
            success: function(data) {
                // do something;
				//alert(JSON.stringify(data));
				console.log(data);
				var all_info = '<p><b>Matrix</b></p>';
				for( var i = 0; i < data.destinations.length; i++){
					all_info+= data.destinations[i].name + ', distance:' + (data.sources[i].distance/1000).toFixed(3) + ' km, duration:' + data.durations[i][1] + ' seconds <br>';
				}
				$("#matrixWindow").stop().fadeOut("slow",function(){ $(this).html(all_info)}).fadeIn(2000);
            },  //end success
			error: function (error) {
				alert("ajax matrix error-> " + error); 
				//$("#weatherResult").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO CITY FOUND</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
}



















     










//======================================= DIRECTION (works with checkbox only), custom directions is in js/directions.js ====================================





//DIRECTIONS->(draw routes)-> works only if checkbox is ON (top left)
//START DRAW ROUTE LINE (works only for a hardcoded start position when u switched checkbox on()top left)
//https://docs.mapbox.com/help/tutorials/getting-started-directions-api/
//-----------------------------------------------------------------------------------------

var BANDERI = [28.665445, 50.264004];
var GLOBAL_ASHAN = [28.684956, 50.265008];

// create a function to make a directions request
function getRoute(end) {
	//if checkbo DirectionMODE is OFF, stop any further
	if(DIRECTION_MODE == false){
	    return false;
	}
	
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  var start = BANDERI; //GLOBAL_ASHAN; //it sets the START coords point GLOBAL
  var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken; // //mapboxgl.accessToken is from Credentials/api-access_token.js

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', url, true);
  req.onload = function() {
    var data = req.response.routes[0];
    var route = data.geometry.coordinates;
	alert(route);
	
	
	
	//SET instructions to div class='instructions'-----------
	// get the sidebar and add the instructions
    var instructions = document.getElementById('instructions');
	instructions.className += ' bordered';
    var steps = data.legs[0].steps;

    var tripInstructions = [];
    for (var i = 0; i < steps.length; i++) {
        tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
       //instructions.innerHTML = '<h3>Directions API</h3><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min 🚴 </span>' + tripInstructions;
	}
	var t = '<h3>Directions API</h3><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min 🚴 </span>' + tripInstructions;
	$("#instructions").stop().fadeOut("slow",function(){ $(this).html(t)}).fadeIn(2000);
	//END SET instructions to div class='instructions'-------
	
    var geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, reset it using setData
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    } else { // otherwise, make a new request
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geojson
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
    // add turn instructions here at the end
  };
  req.send();
}




var startt = GLOBAL_ASHAN; //NOT USED???? -merge it with getRoute() var start

map.on('load', function() {
  // make an initial directions request that
  // starts and ends at the same location
  
  
  
  
  
  
  
  
  
  
  
  
  
  //------------AAAAAAAAAAAAAAAAAAAAAAAa
  
  function aaaab(){
      var canvas = map.getCanvasContainer();
      canvas.style.cursor = '';
      var coords = BANDERI;  //END POINT ????
      var end = {
      type: 'FeatureCollection',
          features: [{
          type: 'Feature',
          properties: {},
          geometry: {
              type: 'Point',
              coordinates: coords
          }
          }
          ]
      };
      if (map.getLayer('end')) {
          map.getSource('end').setData(end);
      } else {
          map.addLayer({
              id: 'end',
              type: 'circle',
              source: {
              type: 'geojson',
              data: {
                  type: 'FeatureCollection',
                  features: [{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                      type: 'Point',
                      coordinates: coords
                  }
                  }]
              }
              },
              paint: {
                  'circle-radius': 10,
                  'circle-color': '#f30'
              }
         });
     }
  }
  
  //END -------------AAAAAAAAAAAAAAAAAAAAAAAa
  
  
  
  if(DIRECTION_MODE == true){  //if u toggled checkbox top left
      getRoute(BANDERI); // arg is END POINT, START POINT IS SET INSIDE FUNCTION ITSELF
      aaaab();
  
  //WHY 2 TIMES calling?
   getRoute(BANDERI); // arg is END POINT, START POINT IS SET INSIDE FUNCTION ITSELF
  
  
  
  

  
  
  
  // Add starting red point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [28.684956, 50.265008] //startt
          }
        }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': 'red' //'#3887be'
    }
  });
  
  
  
  
  // Add ENDING red point to the map
  /*
  map.addLayer({
    id: 'point2',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [28.684956, 50.265008]
          }
        }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': 'red' //'#3887be'
    }
  });
  */
  
} // END if(DIRECTION_MODE){
	
  
  // this is where the code from the next step will go -> DRAW GOES HERE
 // initialize the map canvas to interact with later
 
  


  map.on('click', function(e) {   
    if(DIRECTION_MODE == true){  //if u toggled checkbox top left  
      var canvas = map.getCanvasContainer();
      var coordsObj = e.lngLat;
      canvas.style.cursor = '';
      var coordsClicked = Object.keys(coordsObj).map(function(key) {
         return coordsObj[key];
      });
      var endCoords = {
      type: 'FeatureCollection',
          features: [{
          type: 'Feature',
          properties: {},
          geometry: {
              type: 'Point',
              coordinates: coordsClicked
          }
          }
          ]
      };
      if (map.getLayer('end')) {
          map.getSource('end').setData(endCoords);
      } else {
          map.addLayer({
              id: 'end',
              type: 'circle',
              source: {
              type: 'geojson',
              data: {
                  type: 'FeatureCollection',
                  features: [{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                      type: 'Point',
                      coordinates: coordsClicked
                  }
                  }]
              }
              },
              paint: {
                  'circle-radius': 10,
                  'circle-color': '#f30'
              }
         });
     }
	 
     getRoute(coordsClicked);
} // END if(DIRECTION_MODE){
});


  // END this is where the code from the next step will go
});

// END DRAW LINES

























    //DIRECTION MODE  -> ON/OFF. Changing Checkbox for reloop, checks if DIRECTION Mode is on
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	$("#myCheck").click(function() { 
	    if ($("#myCheck").is(':checked') ){  //if u selected looping in Checkbox
	        DIRECTION_MODE = true; 
            getRoute(BANDERI); 
			aaaab();
            getRoute(BANDERI);			
	    } else {
		   DIRECTION_MODE  = false;    
	    }
	});
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	




	
	
	
	
	
	
    //Show/hide markers on top right click
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	$(".upload").click(function() { 
	
	
	    if ($("#markerShowHide").text()=="Hide marks"){
		    $("#markerShowHide").stop().fadeOut("fast",function(){ $(this).text('Show marks')}).fadeIn(500); //change text in <a>
			
			//Code for Buttons(change text)
			/*if ($("#btn_Control").prop("value")=="Hide markers"){
			  $("#btn_Control").stop().fadeOut("fast",function(){ $(this).attr('value', 'Show markers')}).fadeIn(500);
			  //$("#btn_Control").attr('value', 'Show markers');
			*/
			
			//removes all markers which are in array currentMarkers[]
            if (currentMarkers!==null) {
                for (var i = currentMarkers.length - 1; i >= 0; i--) {
                currentMarkers[i].remove();
                }  	
		     }
	
	    
        } else { //if markers are hidden -show them
			
			$("#markerShowHide").stop().fadeOut("fast",function(){ $(this).text('Hide marks')}).fadeIn(500);
			
			//show all markers which are in array currentMarkers[]
            if (currentMarkers!==null) {
                for (var i = currentMarkers.length - 1; i >= 0; i--) {
                currentMarkers[i].addTo(map);
                }  	
		     }
		}
		
	});
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	//Closes #ETA div (i.e "Marker has beeen saved/deleted"). <span>X</span> is added in JS(i.e in js/add_marker.js)
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 

	$(document).on("click", '.close-eta', function() {   // this click is used to react to newly generated cicles;
	    $("#ETA").stop().fadeOut(2000,function(){ $(this).text('')}).fadeIn(500);
	});
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
		
	//global Function to scroll to certain div, it is global & declared out of IIFE to use in other scripts
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	scrollResults = function (divName, parent)  //arg(DivID, levels to go up from DivID)
	{   //if 2nd arg is not provided while calling the function with one arg
		if (typeof(parent)==='undefined') {
		
            $('html, body').animate({
                scrollTop: $(divName).offset().top
                //scrollTop: $('.your-class').offset().top
             }, 'slow'); 
		     // END Scroll the page to results
		} else {
			//if 2nd argument is provided
			var stringX = "$(divName)" + parent + "offset().top";  //i.e constructs -> $("#divID").parent().parent().offset().top
			$('html, body').animate({
                scrollTop: eval(stringX)         //eval is must-have, crashes without it
                }, 'slow'); 
		}
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	//Function to scroll the page to top
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	scroll_toTop = function () 
	{
	    $("html, body").animate({ scrollTop: 0 }, "slow");	
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	


});
// end ready	
	
	
	
}()); //END IIFE (Immediately Invoked Function Expression)










       //universal functions that shows info of running events(on black screen on top or tech info below), used instead of alerts, uses var counterb, arg(div, message, css class to add), out of IIFE(as variant can use function expression, and declare just {var displayStatus} outside the IIFE)
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     ** 
	  function displayStatus(myDiv, message, cssClass) //arg(div, message, css class to add)
	  {
		  var counterb;
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


