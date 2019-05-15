<?php
//handles ajax request to deletea marker/feature from js/delete_marker.js/
//all logic is in /Classes/DeleteMarker.php
//https://docs.mapbox.com/api/maps/#datasets

ini_set('display_errors',1);
error_reporting(E_ALL | E_STRICT);
require '../vendor/autoload.php'; //Composer autoload

//use namespace
use Cubet\DeleteMarker as Dimas; //Class from /Classes/DeleteMarker.php

$ones = new Dimas();

//delete a marker
$ones->delete_marker_from_dataset($_GET['markerID']);

//show all messages from /Classes/AddMarker.php
$ones->displayMessages();



?>