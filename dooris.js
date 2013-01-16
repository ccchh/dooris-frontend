$(document).ready(function() {
  //console.log('Page load successfull!');
  this.loadData = function() {
    $.get('json.php', function(data) {
        var jsonData = JSON.parse(data);
        jsonData['time'] = jsonData['time']*1000;
        //console.log(jsonData);
        //console.log(jsonData['door']);
        //console.log(jsonData['time']);
        var status = jsonData['door'];
        var time = new Date(parseInt(jsonData['time']));
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