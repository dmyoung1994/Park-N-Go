<?php
require("connections.php");

$address = $_POST['address'];
$cost = $_POST['cost'];
$lat = $_POST['lat'];
$long = $_POST['lng'];
$notes = $_POST['notes'];

if (!is_numeric($cost)){
	$cost = "Free";
}

$query_insert_pos = "INSERT INTO user_tbl (address, cost, lng, lat, notes) VALUES ('$address', '$cost', '$long', '$lat', '$notes')";


$result_insert_pos = mysqli_query($spot, $query_insert_pos);

if ($result_insert_pos) {
	echo "SUCCESS";
} else {
	echo "FAIL";
}

?>