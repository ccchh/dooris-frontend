$(document).ready(function() {
  this.loadData = function() {
    var pathname = window.location['host'];
    if (pathname.toLowerCase().indexOf("localhost") >= 0) {
      pathname = "json.php";
      console.log('Localhost!');
    } else {
      pathname = "dooris.json";
    };
    $.getJSON(pathname, function(data) {
      var jsonData = data;
      jsonData['door']['last_update'] = jsonData['door']['last_update']*1000;
      console.log(jsonData['door']);
      var status = jsonData['door']['status'];
      var time = new Date(parseInt(jsonData['door']['last_update']));
      var timeNow = $.now();
      var timeGoneBy = Math.round(((timeNow - time)/1000)/60);
      //console.log(timeGoneBy);
      //console.log(timeNow);
      //console.log(time);
      //console.log('Date: ' + time);
      //console.log('Status: ' + status);
      if(status === '0') {
          $('#status').html("Please come in, we're open!").addClass('open');
      } else {
          $('#status').html("Sorry, we're closed.").addClass('closed');
      };
      $('#time').html("Last updated " + timeGoneBy + " Minutes ago.");
    });
  };
  this.loadData();
  setInterval(this.loadData, 30*1000);
});
