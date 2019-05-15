<?php
//this class is triggered/used in /ajax_php_scripts/delete_marker_php. And initially triggered in ajax from /js/delete_marker.js
//https://docs.mapbox.com/api/maps/#datasets
//$ curl -X DELETE "https://api.mapbox.com/datasets/v1/account931/{dataset_id}/features/{feature_id}?access_token=YOUR_MAPBOX_ACCESS_TOKEN  //This endpoint requires a token with datasets:write scope.


namespace Cubet; //configured in vendor/autoload.php


//include Mapbox Api key credentails in separate file to easily manipulate with localhost/Hostinger Server settings
include '../Credentials/php_api_credentials/api_credentials.php';

class DeleteMarker {

    private $messageArray = array();  //array to contain all Class messages to echo them all at once in the end with {function displayMessages()}



// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public function delete_marker_from_dataset($markerID){ //args(markerID), args are passed from /ajax_php_scripts/delete_marker_php. And it gets ajax from /js/delete_marker.js
  
      //construct the url to use in cURL (id in $url and in $data must be the same-> it is $this->UUID, a uniue generated number ) 
      $url = "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/" . $markerID . "?access_token=" . MAPBOX_API_KEY; //MAPBOX_API_KEY is in /Credentials/php_api_credentials/api_credentials.php';   //https://api.mapbox.com/datasets/v1/account931/DatasetID/features/FeatureID?access_token
      

	  //cURL Start-> Version for localhost and 000webhost.com, cURL is not supported on zzz.com.ua hosting

  $curl = curl_init();
  curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "DELETE", //DELETE method
     // CURLOPT_POSTFIELDS => $dataX,//"{\n  \"customer\" : \"con\",\n  \"customerID\" : \"5108\",\n  \"customerEmail\" : \"jordi@correo.es\",\n  \"Phone\" : \"34600000000\",\n  \"Active\" : false,\n  \"AudioWelcome\" : \"https://audio.com/welcome-defecto-es.mp3\"\n\n}",
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
	array_push($this->messageArray, " ERROR DELETING A MARKER"); //add message to messageArray to show later in div id="techInfo"
  } else if ($response) {
    //echo "<p> FEATURE STATUS=></p><p>Below is response from API-></p>";
    //echo $response;
	
    //echo "<br>  Marker is Deleted!!!"; //add message to messageArray to show later in div id="techInfo"
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

public function deleteError(){

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
