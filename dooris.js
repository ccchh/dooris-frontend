$(document).ready(function() {

  var checkJSON = function(){
  };

  checkJSON();

  /**
   * Checks wether you are developing on localhost or run this JS in a production environment to determine wich JSON to
   * @uses [window.location]
   * @return string relative path to JSON.
   */
  var checkEnv = function () {
    var pathname = window.location['host'];
    if (pathname.toLowerCase().indexOf("localhost") >= 0) {
      pathname = "json.php";
      console.log('Localhost!');
    } else {
      pathname = "dooris.json";
    }
    return pathname;
  };
  var pathname = checkEnv();

  // Returns human readable string for input in minutes, hours or days
  /**
   * Returns time in minutes/hours instead of seconds
   * @param  {int} time in seconds
   * @return {string} Date in human redable form
   * pre: time >= 0
   * post: returns string
   * Int -> String
   */
  var parseTime = function(time) {
    var strTime = time;
    if(strTime < 60) {
      if(strTime === 1) {
        strTime += ' minute';
      }
      strTime += ' minutes';
    } else if(strTime > 60 || strTime < 1440) {
      strTime = Math.round(strTime/60);
      if(strTime === 1){
        strTime += ' hour';
      } else {
        strTime += ' hours';
      }
    } else if (strTime > 1440) {
      strTime = Math.round(strTime/60/24);
      if(strTime === 1) {
        strTime += ' day';
      } else {
        strTime += ' days';
      }
    }
    return strTime;
  };

  /**
   * Returns the diffrence of time between input time and the current time.
   * @param  {int} time timestamp
   * @return {int}      timedifference in minutes
   */
  var parseTimeDiffrence = function (time) {
    var timeRec = time * 1000;
    var timeNow = $.now();
    return Math.round(((timeNow - timeRec)/1000)/60);
  };

  /**
   * Removes all classes from jQuery Object
   * @param  {jQuery Object} obj
   * @return {nil}
   */
  var clearClasses = function (obj) {
    obj.removeClass('open');
    obj.removeClass('dhcp');
    obj.removeClass('closed');
  };

  this.loadData = function() {
    $.getJSON(pathname, function(data) {
      var jsonData = data;
      var statusDiv = $('#status');
      var status = jsonData['door']['status'];
      var dhcp = jsonData['router']['dhcp'];
      dhcp = dhcp - 2; //Need to remove the Freifunk Router.
      // Status Refresh all 5 minutes. If the status refresh is older than 5 minutes, there is a connection problem.
      if(parseTimeDiffrence(jsonData['door']['last_update']) > 6) {
        status = '-1';
      }
      if(status === '0') {
        clearClasses(statusDiv);
        statusDiv.html("Please come in, we're open!").addClass('open');
      } else if (status ==='1') {
        if (dhcp > 0) {
          clearClasses(statusDiv);
          statusDiv.html("There are " + dhcp + " DHCP Clients online, but the door is closed.").addClass('dhcp');
        } else {
          clearClasses(statusDiv);
          statusDiv.html("Sorry, we're closed.").addClass('closed');
        }
      } else {
        clearClasses(statusDiv);
        statusDiv.html("There is a connection Problem").addClass('closed');
      }
      var time = parseTimeDiffrence(jsonData['door']['last_change']);
      time = parseTime(time);
      $('#time').html("Last status change " + time + " ago.");
    });
  };
  this.loadData();
  setInterval(this.loadData, 30*1000);
});
