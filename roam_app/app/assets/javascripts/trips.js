$(() => {
  console.log("ready")
  tripFormEvents()
})

const tripFormEvents = () => {

  const tripData = `
   <label for="trip_date">Date:</label>
   <input type="date" name="trip[date]" id="trip_date" /> <br>
   <label for="trip_time_ellapsed">Time (in minutes)</label>
   <input type="text" name="trip[time_ellapsed]" id="trip_time_ellapsed" /> <br>
   <label for="trip_comment">User Comments</label>
   <input type="text" name="trip[comment]" id="trip_comment" /> <br>
  `

  $("#trip_taken").change(function () {
    var str = "";
    $( "#trip_taken option:selected" ).each(function() {
      str = $( this ).text()
      // $('#trip_display').append(tripData)
      if (str === "Log a Trip") {
        $('#trip_display').append(tripData)
      }
      else {
        $('#trip_display').html('')
      }
    })
  })

}
