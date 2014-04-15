<?php 
	require("connections.php");
	
	// PAID PARKING QUERY AND ARRAY BUILDING
	
	$query_get_markers = "SELECT id, lat, lng, cost, notes FROM user_tbl";
	
	$result_get_markers = mysqli_query($spot, $query_get_markers);
	
	$pins = array();
	
	while($pSpots=mysqli_fetch_assoc($result_get_markers)){
		$id = $pSpots["id"];
		$address = $pSpots["address"];
		$lat = $pSpots["lat"];
		$lng = $pSpots["lng"];
		$cost = $pSpots['cost'];
		$notes = $pSpots['notes'];
		$pin = array("ID" => $id, "Lat" => $lat,"Long" => $lng, "Cost" => $cost, "notes" => $notes);
						
		array_push($pins, $pin);
	}
	
	
	$jsonArray = array ("Pins" => $pins);
	
	echo json_encode($jsonArray);

?>