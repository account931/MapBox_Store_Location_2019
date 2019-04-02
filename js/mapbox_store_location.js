(function(){ //START IIFE (Immediately Invoked Function Expression)

$(document).ready(function(){
	
	
	
	
	
	
	
//Access api is in Credentials/api_access_token!!!!
//Creats map with center
var map = new mapboxgl.Map({
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






//JSON DATA -> just object with coords to add markers to map onLoad
var geojson = {
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
	   /* icon: {
        iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
        className: 'dot'
      }
	  */
	  
	  
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








// add markers to map from predefined array{var geojson}
geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
	.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
    .addTo(map);
});
// END add markers to map from predefined array{var geojson}












//On map click-> Get coordinates  + Place a marker to map-----------------------------------------------------------------------
var markerZ; //global var  to be able remove prev markers

map.on('click', function (e) {  //mousemove 

	 
    //display/adds clicked coords to <div class="info">
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat);
	
	
	
	 //detects if u not click on marker, if on marker Stops everything
    var clickedEl = window.event ? event.srcElement : e.target;
    if (clickedEl.className && (" " + clickedEl.className + " ").indexOf(" marker ") != -1)   //marker is a class="marker"
	{
		alert("u clicked marker, not the map"); 
		return false;
	}
	
	
	 //adding a marker to a clicked position(if u clicked on the map, not marker)
	 var el = document.createElement('div');
     el.className = 'marker markerAdded';  /* marker-clicked */ //class of created marker
	 var allMarkers = []; //not used???
	 
    //removes prev marker if it was set by click
    /*if(typeof markerZ !== 'undefined'){
		markerZ.remove();
	}*/
	
	 var markerZ = new mapboxgl.Marker(el)
         .setLngLat(e.lngLat)  //set coords
	     .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
         .setHTML('<h3> Clicked Target </h3> <p>Save this point? <br><a href="#"> YES</a></p> <p>' + e.lngLat + '</p>'))
         .addTo(map);

    //allMarkers.push(markerZ); alert(allMarkers);
	
	//allMarkers[0].remove();
	
});
//---------------------------------------------------------------------------------------------------------------------------------








//gets distance details between two points
getMatrix();




//gets distance details between two points
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
				var all_info = '';
				for( var i = 0; i < data.destinations.length; i++){
					all_info+= '<br>' + data.destinations[i].name + ', distance:' + (data.sources[i].distance/1000).toFixed(3) + ' km, duration:' + data.durations[i][1] + ' seconds';
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



























































//DRAW ROUTE LINE
//https://docs.mapbox.com/help/tutorials/getting-started-directions-api/
//-----------------------------------------------------------------------------------------

// create a function to make a directions request
function getRoute(end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  var start = [28.684956, 50.265008];
  var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken; // //mapboxgl.accessToken is from Credentials/api-access_token.js

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', url, true);
  req.onload = function() {
    var data = req.response.routes[0];
    var route = data.geometry.coordinates;
	alert(route);
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




var startt = [28.665445, 50.269004];

map.on('load', function() {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(startt);

  
  
  
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
            coordinates: startt
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
  
  
  
  
  // this is where the code from the next step will go
  
 // initialize the map canvas to interact with later
var canvas = map.getCanvasContainer();


  map.on('click', function(e) {
  var coordsObj = e.lngLat;
  canvas.style.cursor = '';
  var coords = Object.keys(coordsObj).map(function(key) {
    return coordsObj[key];
  });
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
  getRoute(coords);
});
  // END this is where the code from the next step will go
});

// END DRAW LINES














});
// end ready	
	
	
	
}()); //END IIFE (Immediately Invoked Function Expression)
