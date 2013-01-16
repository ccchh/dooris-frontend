<?php

$x = file_get_contents("http://www.hamburg.ccc.de/~chris/dooris");
$door = trim(substr($x, 0, 1));
$time = trim(substr($x, 1));

$array = array("door" => $door, "time" => $time);
echo json_encode($array);

?>
