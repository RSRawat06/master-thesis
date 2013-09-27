$(function() {

  var SLIDER_MIN = 0, SLIDER_MAX = 40135;
  var sliderMin = SLIDER_MIN, sliderMax = SLIDER_MAX;
  var fromDate = new Date(2012,11,30);
  var toDate = new Date();

  // Slider
  $("#queries-max").html(SLIDER_MAX);
  $("#queries-min").html(SLIDER_MIN);
	$( "#slider-range" ).slider({
      range: true,
      min: SLIDER_MIN,
      max: SLIDER_MAX,
      values: [ SLIDER_MIN, SLIDER_MAX ],
      slide: function( event, ui ) {
        sliderMin = ui.values[0];
        sliderMax = ui.values[1];
        $("#queries-max").html(ui.values[1]);
        $("#queries-min").html(ui.values[0]);
      }
  });


  // Datepicker
  $( "#datepicker-from" ).datepicker({ onClose: function(selectedDate) { fromDate = selectedDate; } });
  $( "#datepicker-from" ).datepicker("setDate", fromDate);
  fromDate = buildDateString(fromDate);
  $( "#datepicker-to" ).datepicker({ onClose: function(selectedDate) { toDate = selectedDate; } });
  $( "#datepicker-to" ).datepicker("setDate", toDate);
  toDate = buildDateString(toDate);

  // Update page
  $("#update-button").click(function() {

    var url = buildUrl("json");

    $('#myModal').modal('show');
    $.getJSON(url, function(d) {
      var r = [], j = -1;

      $.each(d["data"], function(index, element) {
        r[++j] = '<tr><td>';
        r[++j] = element["domain"];
        r[++j] = '</td><td>';
        r[++j] = element["first_req_timestamp"];
        r[++j] = '</td><td>';
        r[++j] = element["last_req_timestamp"];
        r[++j] = '</td><td>';
        r[++j] = element["labels"];
        r[++j] = '</td></tr>';
      });

      $("#domains-list").html(r.join(''));
      $('#myModal').modal('hide');
    });
  });

  // JSON download
  $("#json-download-button").click(function() {
    var url = buildUrl("json");
    window.location.href = url;
  });

  // CSV
  $("#csv-download-button").click(function() {
    var url = buildUrl("csv");
    window.location.href = url;
  });

  function buildUrl(mime) {
    var dga      = "&dga="     + $("#dgaCheckbox").is(':checked');
    var nonDga   = "&nonDga="  + $("#nonDgaCheckbox").is(':checked');
    var nx       = "&nx="      + $("#nxdomainCheckbox").is(':checked');
    var minReqs  = "&minReqs=" + sliderMin;
    var maxReqs  = "&maxReqs=" + sliderMax;
    var since    = "&since="   + fromDate;
    var to       = "&to="      + toDate;

    var url = "/domains?" + mime + dga + nonDga + nx + minReqs + maxReqs + since + to;
    return url;
  }

  function buildDateString(date) {
    console.log(1 + date.getMonth());
    console.log(date.getDate());
    console.log(date.getFullYear());
    return (1 + date.getMonth()) + "/" + date.getDate() + "/" + date.getFullYear();
  }

});