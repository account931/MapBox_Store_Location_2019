Works on Mapbox GL JS.
Example of GMaps store_locator application but working on Mapbox GL JS
#Works on localhost only, as zzz.com.ua does not work with cURL php library.
==========================================================
Mapbox JS GL API.
Links to Api manual: https://docs.mapbox.com/api/maps/#datasets
#This is an alternative version of Gmaps Store_Locator based on Mapbox GL Api.
#Stack: php cURL, IIFE, namespace, composer autoload, git, function array_push($this->messageArray, "UUID is NOT unique");  function displayStatus(myDiv, message, cssClass)

==========================================================
https://docs.mapbox.com/mapbox-gl-js/overview/
https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
========================================================


#Marker image is set by css {.marker}








=========================================================
DATASETS
This Mapbox works on Datasets- an on-line equivalent of SQL DB.
This datasets are stored connected to your MapBox account(i.e account931) and retrieved with ajax(by adding to API URL endpoint your access-token + dataset ID).
Dataset ID is not the name u call it, it is auto assigned by mapBox (i.e u name it "DSCI4", but it's id is {cjub7lk3l12ce2wo27cco****}).
To create Dataset:
  -go https://studio.mapbox.com;
  - add data by clicking on map and assigning properties;
  -export to tileset; ???
  -copy generated ID and retrieve your markers by ajax function(for example onLoad)-> https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27*****/features?access_token=' + mapboxgl.accessToken 
  -on ajax success use function {convert_Dataset_to_map()} to convert Datasets values to markers on maps, properties names in DATASET must be the same as in  function {convert_Dataset_to_map()}


=======================================================



#Button to get current location is a part of Api (no work from my side).

#Markers are stored in Api Datasets->Features(special Api storage, that can be used instead of SQL).

#On every load, application makes ajax request to Dataset to get all Features (markers). On ajax success we use function {} to convert dataset features to markers.

#To add new Feature (marker) to Datasets  Api suggests using PUT method. I tried using ajax PUT, but failed. Therefore, now when u add a new marker (js/add_marker.js), it makes ajax POST request to my own php script  (ajax_pho_scripts/add_marker.php). Php script uses cURL lib to send PUT request with body (marker info) to Mapbox Api.
Alternatively, it can be done manually cia Studio.

#Every click on empty map (except for click on .marker) envokes pop-up with buttons (Save; Add to route).

#Direction Api (drawing line between 2 points) has 2 modes.
a.)In normal mode (if checkbox is off), to create a route line between 2 points, u have to click on empty map or marker and select "Add to route". When 2 points are selected the route will be drawn + ETA will be displayed.
 b.)If u switch on checkbox at top left, the application will draw a route line between the endpoint u click on map and hardcoded startpoint (Bandery st).




========================================================= 
COMPOSER AUTOLOADER(and its vendor folder), for more details see {account931/miscellaneous_2018/composer_autoload/ReadMe.txt} 

This is Composer autoloader working example. 
How to: 
  1."CLI-> composer init". It creates composer.json in folder. 
  2. Add ""autoload":" section to composer.json. 
  3. For PSR-4 autoload(classes with namespaces) add section { "psr-4": { "Cubet\": "vendor" }, } . 
  It says that classes with namespace {Cubet} should be loaded from folder {vendor}

For classes that don't fit PSR-4 (classes without namespace) add section {"classmap": ["library/"]}. It says that non PSR-4 classes must be found in folder {library}

CLI-> $ composer dump-autoload -o -> This CLI must be run after each composer edits to update the autoload.

=========================================================







========================================================
PRELOADER(blurs background + show gif loader)

To add preloader onClick:
  1.Put content u want to blur into div with class="App"
  2.Put loader gif image to div with class="error-parent". Must be outside <div class="App">
  3.Add to CSS-> .blur{filter: blur(15px);} + .error-parent{display:none;}
  4. JS->
  $('.App').addClass('blur');  //blur the background
  $(".error-parent").fadeIn(2500); //show error gif from <Error/>
		
  setTimeout(function(){
      $('.App').removeClass('blur'); //removes blur from background
      $(".error-parent").fadeOut(1000); //hide error gif from <Error/>
   }, 4000); // A delay of 1000ms
============================================================