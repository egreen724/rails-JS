$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $('#all_users').on('click', e => {
    e.preventDefault()
    $.get('/users.json', function(data) {
      $('#app_container').html('')
      data.forEach(user => {
        let newUser = new User(user)
        let userHtml = newUser.formatIndex()
        $('#app_container').append(userHtml)
    })}
  )
})

  $(document).on('click', '.user_show', function(e) {
    e.preventDefault()
    let id = this.href.slice(-1)
    $.get(`/users/${id}.json`, function(user) {
      $('#app_container').html('')
      let newUser = new User(user)
      let userShowHtml = newUser.formatShow()
      $('#app_container').append(userShowHtml)
    })
  })
}

function User(user_object) {
  this.id = user_object.id
  this.name = user_object.name
  this.email = user_object.email
  this.bio = user_object.bio
  this.age = user_object.age
  this.trips = user_object.trips
}

User.prototype.formatIndex = function() {

  let takenTrips = this.formatTripsTaken()
  let toDoList = this.formatToDo()

  let userHtml = `
    <a class="user_show" href= "/users/${this.id}"><h4>Name: ${this.name} </h4></a>
    <p>Email: ${this.email}, Bio: ${this.bio}, Age: ${this.age} </p>
    <h4> Trips Taken: ${takenTrips.length} </h4>
    <h4> To Do List: ${toDoList.length} </h4>
  `
  return userHtml
}

User.prototype.formatShow = function() {
  let takenTrips = this.formatTripsTaken()
  let toDoList = this.formatToDo()
  let listHtml = this.listHtml()

  let userHtml = `
  <div id="profile_container">
    <h1> ${this.name}</h1>
    <h4> Bio: ${this.bio} </h4>
    <h4> Age: ${this.age} </h4>
    ${listHtml}
  </div>

  `
  return userHtml
}


User.prototype.formatTripsTaken = function() {
  let takenTrips = []
  let allTrips = this.trips

  allTrips.forEach(trip => {
    if (trip.taken === true) {
        takenTrips.push(trip)
    }
  })
  return takenTrips
}

User.prototype.formatToDo = function() {
  let toDoList = []
  let allTrips = this.trips

  allTrips.forEach(trip => {
    if (trip.taken === false) {
      toDoList.push(trip)
    }
  })
  return toDoList
}

User.prototype.listHtml = function() {
  let takenTrips = this.formatTripsTaken()
  let toDoList = this.formatToDo()

  let tripHtml = ""
  let toDoHtml = ""

  takenTrips.forEach(trip => {
    tripHtml += `<li> ${trip.activity.name}</li>`
  })

  toDoList.forEach(toDo => {
    toDoHtml += `<li> ${toDo.activity.name}</li>`
  })
  let listHtml = `
  <div class="lists">
    <div class="to_do">
      <ul> To Do List:
        ${toDoHtml}
      </ul>
    </div>

    <div class="past_activities">
      <ul> Past Trips:
        ${tripHtml}
      </ul>
    </div>
    `
    return listHtml
}
