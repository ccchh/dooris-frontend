$(document).ready(function() {

  var parseTime = function (time) {
    var timeRec = time * 1000;
    var timeNow = $.now();
    var timeGoneBy = Math.round(((timeNow - timeRec)/1000)/60);
    return timeGoneBy;
  };

  this.loadData = function() {
    // Determine if code runs on local machine
    var pathname = window.location['host'];
    if (pathname.toLowerCase().indexOf("localhost") >= 0) {
      pathname = "json.php";
      console.log('Localhost!');
    } else {
      pathname = "dooris.json";
    };
    $.getJSON(pathname, function(data) {
      var jsonData = data;
      var status = jsonData['door']['status'];
      // Status Refresh all 5 minutes. If the status refresh is older than 5 minutes, there is a connection problem.
      if(parseTime(jsonData['door']['last_update']) > 6) {
        status = '-1';
      }
      if(status === '0') {
        $('#status').html("Please come in, we're open!").addClass('open');
      } else if (status ==='1') {
        // One client is the Freifunk-Router, so the minimum is greater 0.
        if (jsonData['router']['dhcp'] > 1) {
          $('#status').html("We're most likley open. There are " + jsonData['router']['dhcp'] + " DHCP-Clients online, but the Door appears to be closed.").addClass('dhcp').addClass('open');
        } else {
          $('#status').html("Sorry, we're closed.").addClass('closed');
        };
      } else {
        $("#status").html("There is a connection Problem");
      };
      $('#time').html("Last status change " + parseTime(jsonData['door']['last_change']) + " Minutes ago.");
    });
  };
  this.loadData();
  setInterval(this.loadData, 30*1000);
});