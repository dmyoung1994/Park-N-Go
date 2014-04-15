<?php
require_once("connections.php");
require_once("apiCall.php");

$decoded = apiCall("https://api.streetline.com/parkerdata/v1/ParkingDestinations.json?Key=7E484C897E41D");
$spots_array = $decoded->ParkingDestinations;
$length = count($spots_array);

for($i=0;$i<$length;$i++){
	$entry = $spots_array[$i];
	$address = $entry->DestinationName;
	$latitude = $entry->Latitude;
	$longitude = $entry->Longitude;
	$capacity = $entry->SpaceCapacityTotal;
	$isFree = $entry->RateDescription;
	//$rateHigh = $entry->RateHighest;
	$rateLow = $entry->RateLowest;
	if($isFree){
		$rate = "free";
	} else {
		$rate = $rateLow;
	}
	$query = "INSERT INTO parking_tbl (address, lat, lng, rate, capacity, currency) VALUES ('$address', '$latitude', '$longitude', '$rate', '$capacity', 'USD')";
	//print_r($query);
	$result = mysqli_query($spot, $query);
	
}




?>