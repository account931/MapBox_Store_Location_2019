//Directions Api-> draw route between two selected points

var map; //coords of clicked place
var popuppZ;//global from mapbox_store_location.js

(function(){ //START IIFE (Immediately Invoked Function Expression)

  $(document).ready(function(){
	
	
	
	
    //When u click at any empty space at map & then click "add to route" in any temporary pop-up or click "Add to route" in marker from Dataset API
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	//array will store only 2 elements-> from and to coors , i.e [[20.454,50.4546], [20.454,50.4546]]
	var start_end_array = [];
	var resR;
	
	//button id="addRoute" Add to Route could be either in marker from Dataset or in temporary marker generated onClick on empty map. Dataset button "Add to route" will have {data-toRoute="coords"}, tempo marker will have no.
    $(document).on("click", '#addRoute', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	
	    if($(this).attr("data-toRoute")){ //if clicked button has {data-toRoute="coords"},i.e from Dataset API. Coords come as "23.44, 45.54"
			//alert("DATASET " + $(this).attr("data-toRoute") );
		    resR = $(this).attr("data-toRoute"); //assign to var {resR} value from {data-toRoute}.It will be = "23.44, 45.54"
			
			
		} else { //if clicked button does not have {data-toRoute="coords"},i.e it is temporary marker generated on click on empty map. Coords come as " LngLat(28.6602951587, 50.266253504)" 
		
			//alert("Tempo");
			clickedCoords = clickedCoords; //just remain unchanged // It will be = " LngLat(28.6602951587, 50.266253504)"  //coords of clicked empty place, come from /js/mapbox_store_location.js
			console.log(clickedCoords); //clickedCoords; //coords of clicked place, come from /js/mapbox_store_location.js
	        var res = clickedCoords.toString().match(/\(.*?\)/g); //{toString()} is a must // finds anything in ();
		    var resR = res.toString().replace(/\(/g, "").replace(/\)/g, ""); //removes (), and we get string, we should turn to float. Now it is -> "20.58335", "50.54756"
		}
	
	    
	
	
	    
		resR = resR.split(','); //split string to array->  ["20.58335", "50.54756"]
	
		var res2 = [];
		for(var i = 0; i < resR.length; i++){
			res2.push(parseFloat(resR[i]))  //MEGA FIX -> should convert every array el to type parseFloat
		}
		//alert(res2);
		
		var clearArrayText = "<span id='clearArray' class='start-end-info'>X</span>"; //var keeps icon "X" to close info window "From:" and "To:". We'll attach it later
		
		//if 1st array el is empty, i.e it is the 1st click on "add to route", i.e it is "From:"
		if(typeof start_end_array[0] === 'undefined'){
			start_end_array[0] = res2;
			var t = "<span class='start-end-info'>from: " + start_end_array[0] + clearArrayText + "</span>";
		//if it is the second click	on "add to route", i.e it is "To:"
		} else {
			start_end_array[1] = res2;
			var t = "<span class='start-end-info'>from: " + start_end_array[0] + clearArrayText + "</span><br> <span class='start-end-info'>to__: " + start_end_array[1] + "</span>";
			//alert("ff " + start_end_array.length);
			run_direction_API();
			
		}
		
		
		$("#start_end_direction_info").stop().fadeOut("slow",function(){ $(this).html(t)}).fadeIn(2000); //html "from:" and "to:"
		
		//removes prev marker pop-up if it was set by click
        if(typeof popuppZ !== 'undefined'){  //popuppZ is global from mapbox_store_location.js, defined at 1st line, outside IIFE here and in mapbox_store_location.js
		    popuppZ.remove();
	    }
	 
	 
	});//end click
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************	
		
		
	





    //Clears "From:" and "To:" fields in info window in the header + clears ETA + clears Direction layer
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
     $(document).on("click", '#start_end_direction_info', function() {   // this  click  is  used  to   react  to  newly generated cicles;	
	     $("#start_end_direction_info").stop().fadeOut("slow",function(){ $(this).html("")}).fadeIn(2000); //clears 
		 start_end_array = [];  //reset From/to array
		 
		 //clears ETS
		 $("#ETA").stop().fadeOut("slow",function(){ $(this).html('')}).fadeIn(2000);
		 
		 //clears Direction API line layer(line route)
		 if (map.getLayer('end')) {
			  map.removeLayer('route'); //to clear Direction Api Layer, u have to remove both Layer and Source. Layer must be removed FIRST!!!!!!!!!!!!!
			  map.removeSource('route');
              map.removeLayer('end'); 
			  map.removeSource('end');
		 }
     });//end click
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
     //END Clears "From:" and "To:" info window in the header
	 
	 
	 
	 
	 
	 
	 
	 
	//Just bundle function to run getRoute(). It must be run 2 times in order to draw a line between 2 points
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	 function run_direction_API(){
		 //getRoute([28.665445, 50.264004], [28.684956, 50.265008]);
		 getRoute(start_end_array[0], start_end_array[1]); //start_end_array stores 2 els-> from & to, i.e [[20.454,50.4546], [20.454,50.4546]]
		 getRoute(start_end_array[0], start_end_array[1]);
	 }
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	 
	 
	 
	 
	 
	 
	 
//======================================= DIRECTION API ========================================================================
// create a function to make a directions request
function getRoute(startX, end) {
	
	
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  var start = startX; //BANDERI; //GLOBAL_ASHAN; //it sets the START coords point GLOBAL
  //alert("start[0]-> " + end[1]);
  var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken; // //mapboxgl.accessToken is from Credentials/api-access_token.js

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
       //instructions.innerHTML = '<h3>Directions API</h3><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min рџљґ </span>' + tripInstructions;
	}
	var t = '<h3>Directions API</h3><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min  </span>' + tripInstructions;
	$("#instructions").stop().fadeOut("slow",function(){ $(this).html(t)}).fadeIn(2000);
	
	//html() ETA
	$("#ETA").stop().fadeOut("slow",function(){ $(this).html( '<p><i class="fa fa-share-square-o" style="font-size:30px"></i> Route is <b>' + Math.floor(data.duration / 60) + ' min </b><span class="close-eta">X</span></p>')}).fadeIn(2000); //show ETA above the map
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
  
  
  //aaaaaaaaaaa
  var canvas = map.getCanvasContainer();
      canvas.style.cursor = '';
	  /*
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
	  */
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
                      coordinates: end
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
  // end aaaaaa
}
	 
	 
//======================================= DIRECTION API ========================================================================	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 

  });
  // end ready	
	
	
	
}()); //END IIFE (Immediately Invoked Function Expression)
