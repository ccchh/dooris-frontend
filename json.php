<?php

$url = "http://www.hamburg.ccc.de/dooris/dooris.json";
$ch = curl_init();
$timeout = 5; // set to zero for no timeout
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$x = curl_exec($ch);
curl_close($ch);
echo($x);
?>
