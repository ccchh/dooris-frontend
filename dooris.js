(function(){
  console.log('Page load successfull!');
  $.get('json.php', function(data) {
    var jsonData = JSON.parse(data);
    console.log(jsonData);
    console.log(jsonData['door']);
    console.log(jsonData['time']);
    var status = jsonData['door'];
    var time = new Date(parseInt(jsonData['time'])*1000);
    console.log('Date: ' + time);
    console.log('Status: ' + status);
    if(status === '0') {
      $('#status').html("Please come in!").addClass('open');
    } else {
      $('#status').html("Sorry, we're closed.").addClass('closed');
    };
    $('#time').html("Last updated at " +time );
  });
})();