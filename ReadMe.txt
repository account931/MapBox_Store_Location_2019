Works on Mapbox GL JS.
Example of GMaps store_locator application but working on Mapbox GL JS

https://docs.mapbox.com/mapbox-gl-js/overview/
https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
========================================================


#Marker image is set by css {.marker}

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