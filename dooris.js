$(document).ready(function() {

  /*
  Checks if code runs on dev machine or production environment to enable custom json for testing
  If you're running this code on localhost and experience unexpected behavior (status/times won't fit)
  please check json.php for override settings!
  */

  var checkEnv = function () {
    var pathname = window.location['host'];
    if (pathname.toLowerCase().indexOf("localhost") >= 0) {
      pathname = "json.php";
      console.log('Localhost!');
    } else {
      pathname = "dooris.json";
    };
    return pathname;
  };
  var pathname = checkEnv();

  // Returns diffrence between input timestamp and current time in minutes
  var parseTimeDiffrence = function (time) {
    var timeRec = time * 1000;
    var timeNow = $.now();
    var timeGoneBy = Math.round(((timeNow - timeRec)/1000)/60);
    return timeGoneBy;
  };

  // Returns human readable string for input in minutes
  var parseTime = function(time) {
    var strTime = time;
    if(strTime > 60) {
      strTime = Math.round(strTime/60);

      if(strTime === 1){
        strTime += ' hour';
      } else {
        strTime += ' hours';
      };
    } else if (strTime > 1440) {
      strTime = Math.round(strTime/60/24);
      if(strTime === 1) {
        strTime += ' day';
      } else {
        strTime += ' days';
      };
    };
    return strTime;
  };

  this.loadData = function() {
    $.getJSON(pathname, function(data) {
      var jsonData = data;
      var status = jsonData['door']['status'];
      // Status Refresh all 5 minutes. If the status refresh is older than 5 minutes, there is a connection problem.
      if(parseTimeDiffrence(jsonData['door']['last_update']) > 6) {
        status = '-1';
      }
      if(status === '0') {
        $('#status').html("Please come in, we're open!").addClass('open');
      } else if (status ==='1') {
        // One client is the Freifunk-Router, so the minimum is greater 0.
        if (jsonData['router']['dhcp'] > 1) {
          $('#status').html("There are " + jsonData['router']['dhcp'] + " DHCP Clients online, but the door is closed.").addClass('dhcp');
        } else {
          $('#status').html("Sorry, we're closed.").addClass('closed');
        };
      } else {
        $("#status").html("There is a connection Problem");
      };
      var time = parseTimeDiffrence(jsonData['door']['last_change']);
      time = parseTime(time);
      $('#time').html("Last status change " + time + " ago.");
    });
  };
  this.loadData();
  setInterval(this.loadData, 30*1000);
});