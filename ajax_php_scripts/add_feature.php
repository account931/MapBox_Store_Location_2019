<?php
//PHP cURL variant, must have {curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false)} in oreder to work
//Must pass secret_token here with ajax from js/add_marker.js



echo "Start <br>";

$url = "https://api.mapbox.com/datasets/v1/account931/cjub7lk3l12ce2wo27ccoopdl/features/5cfa32707c902a3231b5258e3b93f24bc?access_token=sk.ey";
$dataX = '{"id": "5cfa32707c902a3231b5258e3b93f24bc","type": "Feature","geometry": {"coordinates": [28.652198, 50.267998],"type": "Point"}, "properties": {"title": "School Nu", "description": "School Nu Inserted with Php cURL"} }';


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
    echo "cURL Error #:" . $err;
} else {
    echo "<p> FEATURE SUCCESSFULLY INSERTED=></p><p>Below is response from API-></p>";
    echo $response;
}


/*
$ curl "https://api.mapbox.com/datasets/v1/account931/{dataset_id}/features/{feature_id}?access_token=YOUR_MAPBOX_ACCESS_TOKEN
This endpoint requires a token with datasets:write scope.
" \
  -X PUT \
  -H "Content-Type: application/json" \
  -d @file.geojson
*/




?>