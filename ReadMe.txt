Works on Mapbox GL JS.
Example of GMaps store_locator application but working on Mapbox GL JS

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