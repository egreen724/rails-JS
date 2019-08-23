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
    <a href= "/users/${this.id}"><h4>Name: ${this.name} </h4></a>
    <p>Email: ${this.email}, Bio: ${this.bio}, Age: ${this.age} </p>
    <h5>Number of Trips Taken: ${this.trips.length} </h5>
  `
  return userHtml
}
