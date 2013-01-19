<?php
  $local = 0;

  // Don't fetch any Data if in Dev mode but execute custom json.
  if ($local != 1) {
    $url = "http://www.hamburg.ccc.de/dooris/dooris.json";
    $ch = curl_init();
    $timeout = 5; // set to zero for no timeout
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
    $x = curl_exec($ch);
    curl_close($ch);
    echo($x);
  }

  if(!$x) {
    date_default_timezone_set('CET');
    $date = date_create();
    $date = date_timestamp_get($date);
    echo('{"router": {"dhcp": "1", "last_change": "1358463839", "last_update": "'. $date .'"}, "door": {"status": "1", "last_change": "1358460719", "last_update": "'. $date .'"}, "apiversion": 1}');
  }


?>
