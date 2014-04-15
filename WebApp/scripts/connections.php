<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"

$hostname_spot = "kalindar.com";
$database_spot = "kalindar_kik";
$username_spot = "kalindar_daniel";
$password_spot = "!Rottench33se!";

$spot = mysqli_connect($hostname_spot, $username_spot, $password_spot) or trigger_error(mysql_error(),E_USER_ERROR); 

mysqli_query($spot, "SET character_set_results=utf8");
mb_language('uni');
mb_internal_encoding('UTF-8');
mysqli_select_db($spot, $database_spot);
mysqli_query($spot, "set names 'utf8'");

date_default_timezone_set("America/Toronto");

if (!isset($_SESSION)) {
  session_start();
}

?>