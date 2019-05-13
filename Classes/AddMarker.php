<?php
//this class is triggered/used in /ajax_php_scripts/add_marker_php. And initially triggered in ajax from /js/add_marker.js

namespace Cubet; //configured in vendor/autoload.php


//include Mapbox Api key credentails in separate file to easily manipulate with localhost/Hostinger Server settings
include '../Credentials/php_api_credentials/api_credentials.php';

class AddMarker {
    private $UUID;  //unique ID for marker
    private $messageArray = array();  //array to contain all Class messages to echo them all at once in the end with {function displayMessages()}



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







// Check if  generated ID is unique in Dataset. How it works: it address to specif URL {"https://api.mapbox.com/datasets/v1/account931/{dataset_ID}/features/{feature_ID}?access_token=" . MAPBOX_API_KEY}.
//IF {feature_ID} is unique API returns {message":"Feature does not exist"} and function returns TRUE
//If we won't check ID for unique and it happens to be such ID in Dataset, the script will overwrite the existing feature /marker

// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public function checkIfUniqueUUID(){

  //construct the url to use in cURL
  $url = "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/" .$this->UUID. "?access_token=" . MAPBOX_API_KEY; //MAPBOX_API_KEY is in /Credentials/php_api_credentials/api_credentials.php';   //https://api.mapbox.com/datasets/v1/account931/DatasetID/features/FeatureID?access_token

//cURL Start-> Version for localhost and 000webhost.com, cURL is not supported on zzz.com.ua hosting

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











// Save the marker with help of php cURL library. How it works: cURL address to specif URL {https://api.mapbox.com/datasets/v1/account931/{DatasetID}/features/{FeatureID}?access_token}
//and passes {$dataX} as body. Both $url and $dataX should contain the same feature ID generated in {function generateUUID()} -> $this->UUID. If we won't check ID for unique and it happens to be such ID in Dataset, the script will overwrite the existing feature /marker
//$dataX contains = '{"id":"{$this->UUID}" ,"type": "Feature","geometry": {"coordinates": [{$myLng}, {$myLat}],"type": "Point"}, "properties": {"title":"{$myName}", "description":"{$myDescript}"} }';
// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public function saveMarker($myLng, $myLat, $myName, $myDescript){ //args(lat, lon,name, descr), args are passed from /ajax_php_scripts/add_marker_php. And it gets ajax from /js/add_marker.js
  
      //construct the url to use in cURL (id in $url and in $data must be the same-> it is $this->UUID, a uniue generated number ) 
      $url = "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/" . $this->UUID . "?access_token=" . MAPBOX_API_KEY; //MAPBOX_API_KEY is in /Credentials/php_api_credentials/api_credentials.php';   //https://api.mapbox.com/datasets/v1/account931/DatasetID/features/FeatureID?access_token
      
	  //construct data to pass in cURL body (id in $url and in $data must be the same-> it is $this->UUID, a uniue generated number ) 
	  $dataX = '{"id":"' . $this->UUID . '" ,"type": "Feature","geometry": {"coordinates": [' . $myLng . ',' . $myLat . '],"type": "Point"}, "properties": {"title":"' . $myName . '", "description":"' . $myDescript.'"} }'; //MEGA FIX->mega Error was here, {$myName, $myDescript} must be in {""}

	  //cURL Start-> Version for localhost and 000webhost.com, cURL is not supported on zzz.com.ua hosting

    //echo $dataX . "<br>";
	//return false;
	
	//$url = "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/5cfa32707c902a3231b5258e3b93f24bcc?access_token=" . MAPBOX_API_KEY; //MAPBOX_API_KEY is in /Credentials/php_api_credentials/api_credentials.php';
    //$dataX = '{"id":"5cfa32707c902a3231b5258e3b93f24bcc","type": "Feature","geometry": {"coordinates": [28.652198, 50.267998],"type": "Point"}, "properties": {"title": "Nuhavn", "description": "School Nu Inserted with Php cURL"} }';

	

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
  } else if ($response) {
    //echo "<p> FEATURE STATUS=></p><p>Below is response from API-></p>";
    //echo $response;
	array_push($this->messageArray, $myName, $myDescript);//add message to messageArray to show later in div id="techInfo"
    //echo "<br> Marker is Saved!!!";
	array_push($this->messageArray, " Marker is Savedd!!!"); //add message to messageArray to show later in div id="techInfo"
	array_push($this->messageArray, $response); //add message to messageArray to show later in div id="techInfo"
  }

//END cURL -> Version for localhost and 000webhost.com, cURL is not supported on zzz.com.ua hosting-------------



  
   
	
	
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
