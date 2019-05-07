<?php
//used in /ajax_php_scripts/add_marker_php. Triggered in ajax from /js/add_marker.js

namespace Cubet;


//include Mapbox Api key credentails in separate file to easily manipulate with localhost/Hostinger Server settings
include '../Credentials/php_api_credentials/api_credentials.php';

class AddMarker {
    private $UUID;
    private $messageArray = array();



// Generates unique ID for marker
// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public function generateUUID(){
     //generates UUID - unique ticket number
	 $UUID = md5(uniqid());  //md5 the unique number
	 //echo json_encode('$UUID=> ' . $UUID);
	 array_push($this->messageArray, $UUID); //add message to messageArray to show later
	 $this->UUID = $UUID ;
}


// **                                                                                  **
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************







// Check if  generated ID is unique in Dataset
// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public function checkIfUniqueUUID(){


  $url = "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/" .$this->UUID. "?access_token=" . MAPBOX_API_KEY; //MAPBOX_API_KEY is in /Credentials/php_api_credentials/api_credentials.php';   //https://api.mapbox.com/datasets/v1/account931/DatasetID/features/FeatureID?access_token

//cURL Start-> Version for localhost, cURL is not supported on zzz.com.ua hosting

  $curl = curl_init();
  curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      //CURLOPT_POSTFIELDS => $dataX,//"{\n  \"customer\" : \"con\",\n  \"customerID\" : \"5108\",\n  \"customerEmail\" : \"jordi@correo.es\",\n  \"Phone\" : \"34600000000\",\n  \"Active\" : false,\n  \"AudioWelcome\" : \"https://audio.com/welcome-defecto-es.mp3\"\n\n}",
      CURLOPT_HTTPHEADER => array(
         "cache-control: no-cache",
         "content-type: application/json",
         "x-api-key: whateveriyouneedinyourheader"
      ),
  ));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //must option to Kill SSL, otherwise sets an error


  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    //echo "cURL Error #:" . $err;
  } else {
    //echo "<p> FEATURE STATUS=></p><p>Below is response from API-></p>";
    //echo $response;
  }

//END cURL -> Version for localhost, cURL is not supported on zzz.com.ua hosting-------------

//Version for zzz.com.ua, which does not work with cURL
/*
$response = file_get_contents($url,null,null);
*/

  
	$messageAnswer = json_decode($response, TRUE); //gets the cUrl response and decode to normal array
	if(isset($messageAnswer['message'])){
	    $mmm = $messageAnswer['message']; //gets the array element "message", it exists only if UUID is unique, i.e "message":"Feature does not exist", if Feature exists, 'message' does not exist
	} else {$mmm = "NOT UNIQUE";}
	
	array_push($this->messageArray, $messageAnswer); //gets the "message" from cURL//adds message from cURL, if OK must be "Feature does not exist"
    if($mmm == "Feature does not exist"){ //if {"message":"Feature does not exist"}
	    array_push($this->messageArray, "UUID is unique"); //add message to messageArray to show later
        return true;
	} else {
		array_push($this->messageArray, "UUID is NOT unique!!!"); //add message to messageArray to show later
		return false;
	}
}


// **                                                                                  **
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************











// Save the marker with php cURL
// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public function saveMarker($myLng, $myLat, $myName, $myDescript){
  
  
      $url = "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/" .$this->UUID. "?access_token=" . MAPBOX_API_KEY; //MAPBOX_API_KEY is in /Credentials/php_api_credentials/api_credentials.php';   //https://api.mapbox.com/datasets/v1/account931/DatasetID/features/FeatureID?access_token
      $dataX = '{"id":' . $this->UUID . ',"type": "Feature","geometry": {"coordinates": [' . $myLng . ',' .  $myLat . '],"type": "Point"}, "properties": {"title":' . $myName . ', "description":' . $myDescript. '} }';
//cURL Start-> Version for localhost, cURL is not supported on zzz.com.ua hosting

    

  $curl = curl_init();
  curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "PUT",
      CURLOPT_POSTFIELDS => $dataX,//"{\n  \"customer\" : \"con\",\n  \"customerID\" : \"5108\",\n  \"customerEmail\" : \"jordi@correo.es\",\n  \"Phone\" : \"34600000000\",\n  \"Active\" : false,\n  \"AudioWelcome\" : \"https://audio.com/welcome-defecto-es.mp3\"\n\n}",
      CURLOPT_HTTPHEADER => array(
         "cache-control: no-cache",
         "content-type: application/json",
         "x-api-key: whateveriyouneedinyourheader"
      ),
  ));
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //must option to Kill SSL, otherwise sets an error


  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    //echo "cURL Error #:" . $err;
	array_push($this->messageArray, " ERROR SAVING MARKER"); //add message to messageArray to show later in div id="techInfo"
  } else {
    //echo "<p> FEATURE STATUS=></p><p>Below is response from API-></p>";
    //echo $response;
	array_push($this->messageArray, $myName, $myDescript);//add message to messageArray to show later in div id="techInfo"
    //echo "<br> Marker is Saved!!!";
	array_push($this->messageArray, " Marker is Savedd!!!"); //add message to messageArray to show later in div id="techInfo"
  }

//END cURL -> Version for localhost, cURL is not supported on zzz.com.ua hosting-------------



  
   
	
	
}


// **                                                                                  **
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************







// If is ERROR
// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public function saveError(){

    //echo "<br> ERROR SAVING";
}


// **                                                                                  **
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************








//Show all messages from Class
// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public function displayMessages(){
	 //show all messages
    echo json_encode($this->messageArray);
}
// **                                                                                  **
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************





   

} // end  Class
























?>