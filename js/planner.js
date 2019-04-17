    // initialize input widgets first
  $('#startTime').timepicker({
      'showDuration': true,
      'timeFormat': 'g:ia'
  });

  $('#endTime').timepicker({
    'showDuration': true,
    'timeFormat': 'g:ia'
});

  $('#startDate').datepicker({
      'format': 'm/d/yyyy',
      'autoclose': true
  });

  $('#endDate').datepicker({
    'format': 'm/d/yyyy',
    'autoclose': true
});

${'.list-group-item-action'}.dblclick({
  console.log("HERE");
});

  // initialize datepair
  var start = document.getElementById('start');
  var datepairStart = new Datepair(start);


  var end = document.getElementById('end');
  var datepairEnd = new Datepair(end);


