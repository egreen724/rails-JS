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
  let userHtml = `
    <a class="user_show" href= "/users/${this.id}"><h4>Name: ${this.name} </h4></a>
    <p>Email: ${this.email}, Bio: ${this.bio}, Age: ${this.age} </p>
    <h5>Number of Trips Taken: ${this.trips.length} </h5>
  `
  return userHtml
}

User.prototype.formatShow = function() {
  debugger
  let userHtml = `
  <div id="profile_container">
    <h1> ${this.name}</h1>
    <h4> Bio: ${this.bio} </h4>
    <h4> Age: ${this.age} </h4>
    <h4> Number of Trips Taken: ${this.trips.length} </h4>

  </div>

  `
  return userHtml
}

// <a href="/users/${this.id}/trips/${this.trips.last.id}"><h4> Most Recent Trip: ${this.trips.last} </h4></a>
