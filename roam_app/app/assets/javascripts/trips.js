$(() => {
  tripFormEvents()
})

const tripFormEvents = () => {

  const tripData = `
    <%= f.label :date, "Date:" %>
    <%= f.date_field :date %> <br>
    <%= f.label :time_ellapsed, "Time (in minutes)" %>
    <%= f.text_field :time_ellapsed %> <br>
    <%= f.label :comment, "User Comments" %>
    <%= f.text_field :comment %> <br>
  `

  $("#trip_taken").change(function () {
    var str = "";
    $( "#trip_taken option:selected" ).each(function() {
      str += $( this ).text() + " ";
      $('#trip_display').append(tripData)
    })
  })

}
