Works on Mapbox GL JS.
Example of GMaps store_locator application but working on Mapbox GL JS
#Works on localhost and and 000webhost.com only (http://dimmm931.000webhostapp.com/MapBox_Store_Location_2019/), as zzz.com.ua does not work with cURL php library.
==========================================================
Mapbox JS GL API.
Links to Api manual: https://docs.mapbox.com/api/maps/#datasets
#This is an alternative version of Gmaps Store_Locator based on Mapbox GL Api.
#Stack: php cURL, IIFE, namespace, composer autoload, git, prealoader, data-coords, function array_push($this->messageArray, "UUID is NOT unique");  function displayStatus(myDiv, message, cssClass)

==========================================================
https://docs.mapbox.com/mapbox-gl-js/overview/
https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
https://docs.mapbox.com/api/maps/#datasets
========================================================


#Marker image is set by css class{.marker}








=========================================================
DATASETS
This Mapbox works on Datasets- an on-line equivalent of SQL DB.
This datasets are stored connected to your MapBox account(i.e account931) and retrieved with ajax(by adding to API URL endpoint your access-token + dataset ID).
Dataset ID is not the name u call it, it is auto assigned by mapBox (i.e u name it "DSCI4", but it's id is {cjub7lk3l12ce2wo27cco****}).
To create Dataset:
 
  - add data by clicking on map and assigning properties;
  -export to  -go https://studio.mapbox.com; -> Datasets-> DSCI4tileset; ???
  -copy generated ID and retrieve your markers by ajax function(for example onLoad)-> https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27*****/features?access_token=' + mapboxgl.accessToken 
  -on ajax success use function {convert_Dataset_to_map()} to convert Datasets values to markers on maps, properties names in DATASET must be the same as in  function {convert_Dataset_to_map()}

To create feature(marker) manually:
    -go https://studio.mapbox.com; -> Datasets-> DSCI4-> add marker via editor manually
=======================================================



#A Button to get current location is a part of Api (no implementation work from my side).

#Markers are stored in Api Datasets->Features(special Api storage, that can be used instead of SQL).

#Dataset is an Mapbox Api storage, which  allow us not using SQL DB. It us connected to your Mapbox account (account931@ukr.net)(m***+salt). All requests myst contain Api key. For insert/update/delete operation the Api key  must have "Write" scope.
As zzz.com.ua does not support cURL php lib, this application is deployed to http://dimmm931.000webhostapp.com/MapBox_Store_Location_2019.



==============================================
HOW TO LOADE MARKERS TO MAP FROM DATASET:
#Markers are loaded from an API Dataset in js/mapbox_store_locations.js with js ajax (ONLY)-> {function gets_Dataset_features_from_API();}. 
   This ajax must be {cache: false}, it prevents caching, so u can add a new marker and it 'll appear immediately
   On every app load, the application makes ajax request to Dataset to get all Features (markers). 
   On ajax success we use function {convert_Dataset_to_map(geojson)} to convert dataset features to markers on map (it creates marker and it's pop-up). 
   Additionally we assign a pop-up "DELETE" button with a {data-coords=marker.id}, which will be used to Delete a marker from Darset API.
==============================================



#To add new Feature (marker) to Datasets  Api suggests using PUT method. I tried using ajax PUT, but failed. Therefore, now when u add a new marker (js/add_marker.js), it makes ajax POST request to my own php script  (ajax_pho_scripts/add_marker.php). Php script uses cURL lib to send PUT request with body (marker info) to Mapbox Api.
Alternatively, it can be done manually via Studio.






============================
HOW TO ADD A MARKER WITH API:
#How to add a marker (feature) to Dataset: is done by ajax request from /js/add_marker.js to my php script -> ajax_php_scripts/add_marker_php, which calls /Classes/AddMarker.php methods. 
  Method {function generateUUID()} generates UUID ($this->UUID)(marker ID(which must be unique, otherwise it will overwrite an existing marker in Dataset)),
  and use cURL php lib to make "PUT" request to Api with body ($dataX) containing new marker details(id, coords, name). 
  cURL should have a must-have option to disable SSL, since my hosting does not support any {curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);}
#Method {checkIfUniqueUUID()} in /Classes/AddMarker.php checks if  generated ID is unique in Dataset. If we won't check ID for unique and it happens to be such ID in Dataset, the script will overwrite the existing feature /marker
#Method  {saveMarker($myLng, $myLat, $myName, $myDescript)} saves the marker/feature to Dataset. It uses cURL Php to send "PUT" request to Api with body ($dataX) containing new marker details(id, coords, name).
    //It saves the marker with help of php cURL library. How it works: cURL address to specif URL {https://api.mapbox.com/datasets/v1/account931/{DatasetID}/features/{FeatureID}?access_token}
    //and passes {$dataX} as body. Both $url and $dataX should contain the same feature ID generated in {function generateUUID()} -> $this->UUID. If we won't check ID for unique and it happens to be such ID in Dataset, the script will overwrite the existing feature /marker
    //$dataX contains = '{"id":"{$this->UUID}" ,"type": "Feature","geometry": {"coordinates": [{$myLng}, {$myLat}],"type": "Point"}, "properties": {"title":"{$myName}", "description":"{$myDescript}"} }';
  
CLI $curl example:
$url = "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/5cfa32707c902a3231b5258e3b93f24bc?access_token=" . MAPBOX_API_KEY;
$url = "https://api.mapbox.com/datasets/v1/account931/{dataset_id}/features/{feature_id}?access_token=" . MAPBOX_API_KEY;


===========================================





=================================================
HOW TO DELETE A MARKER WITH API:
#On creating markers, all "DELETE" button is assigned with a {data-coords=marker.id}, which will be used to Delete a marker from Darset API.
#Deleteing is done via ajax-> js/delete_marker.js. It address ajax_php_scripts/delete_marker_php, which calls /Classes/DeleteMarker.php methods.

===============================================




#Every click on empty map (except for click on .marker) envokes pop-up with buttons (Save; Add to route).Logic in /js/mapbox_store_location.js ->map.on('click', function (e) { 



==========================================
#Direction Api (drawing line between 2 points) has 2 modes.
a.)In normal mode (if checkbox is off), to create a route line between 2 points, u have to click on empty map or marker and select "Add to route". When 2 points are selected the route will be drawn + ETA will be displayed.
 b.)If u switch on checkbox at top left, the application will draw a route line between the endpoint u click on map and hardcoded startpoint (Bandery st).
==========================================



#API Keys (credentials) are stored in folder {/Credentials/}, which contains the same Api keys; for JS use folder ->(in "/Credentials/api_access_token.js") 
 and for php use ->(in "/Credentials/php_api_credentials/api_credentials.php")
 
 
=============================== 
 
 
 




 
 
 
 
 
 
 
 

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

Known issues:
# use css {word-break:break-all;} to breaks the lines of text so it does not overlap div space
# map stops responding after insert/delete operation - was caused by wrong recentering the map