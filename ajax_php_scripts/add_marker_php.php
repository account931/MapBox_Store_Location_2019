<?php
//handles ajax request to save a new marker from js/add-marker.js/add-marker
//all logic is in /Classes/AddMarker.php

ini_set('display_errors',1);
error_reporting(E_ALL | E_STRICT);
require '../vendor/autoload.php'; //Composer autoload

//use namespace
use Cubet\AddMarker as Dima; //Class from /Classes/AddMarker.php

$one = new Dima();

$one->generateUUID();
if ($one->checkIfUniqueUUID() == true){
	$one->saveMarker($_GET['coordsLNG'], $_GET['coordsLAT'], $_GET['markerName'], $_GET['markerDesc']); //args-> value from html form//(28.682198, 50.267998, 'Nuhavn', 'nnn')
} else {
	$one->saveError();
}

//show all messages from /Classes/AddMarker.php
$one->displayMessages();



?>