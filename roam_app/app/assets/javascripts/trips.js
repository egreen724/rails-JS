$(document).ready(function() {
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
      if (str === "Log a Trip") {
        $('#trip_display').append(tripData)
      }
      else {
        $('#trip_display').html('')
      }
    })
  })

  $("#new_trip").on("submit", function(e) {
    e.preventDefault()
    const values = $(this).serialize()

    $.post('/trips', values).done(function(data) {
      $('#app_container').html(" ")
      let newTrip = new Trip(data)
      let html = ""

      if (newTrip.taken === false) {
        html = newTrip.toDoDisplay()
      }
      if (newTrip.taken === true) {
        html = newTrip.tripTakenDisplay()
      }

      $('#app_container').html(html)
      history.pushState(null, null, `/trips/${newTrip.id}`)
    })
  })

}

function Trip(trip) {
  this.id = trip.id
  this.user_id = trip.user_id
  this.activity_id = trip.activity_id
  this.taken = trip.taken
  this.comment = trip.comment
  this.date = trip.date
  this.time_ellapsed = trip.time_ellapsed
  this.activity = trip.activity
  this.user = trip.user
}

Trip.prototype.toDoDisplay = function() {
    let tripHtml = `
      <h2> Activity Name: ${this.activity.name} </h2>
      <div class="info">
      <h3> Activity Category: ${this.activity.category}</h3>
      <h3> Distance: ${this.activity.distance}</h3>
      <h3> Address: ${this.activity.city}, ${this.activity.state}</h3>
      <a class="button" href="/trips/${this.id}/edit">Log a Trip</a>
      <br>
      <a class="button" href="/trip/${this.id}/delete">Delete Trip</a>
      </div>
    `
  return tripHtml
}

Trip.prototype.tripTakenDisplay = function() {
  let tripHtml = `
  <h2> Activity Name: ${this.activity.name} </h2>
  <div class="info">
  <h3> Activity Category: ${this.activity.category}</h3>
  <h3> Distance: ${this.activity.distance}</h3>
  <h3> Address: ${this.activity.city}, ${this.activity.state}</h3>
  <h2> ${this.user.name}'s Trip:</h2>
  <h3> Date: ${this.date} </h3>
  <h3> Time: ${this.time_ellapsed} minutes</h3>
  <h3> User Comments: ${this.comment}  </h3>
  </div>
  <a class="button" href="/activities/${this.activity_id}/trips">See similar Trips taken by other Users</a>
  <a class="button" href="/trips/${this.id}/edit">Edit Trip Details</a>
  <br>
  <a class="button" href="/trip/${this.id}/delete">Delete Trip</a>
  </div>
  `
  return tripHtml
}
