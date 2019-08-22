$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $('#all_users').on('click', e => {
    e.preventDefault();
    $.get('/users.json', function(data) {
      console.log(data)
      $('#app_container').html('')
      data.forEach(user => {
        let newUser = new User(user)
        console.log(newUser)
    })}
  )
})
}

function User(user_object) {
  this.name = user_object.name
  this.email = user_object.email
  this.bio = user_object.bio
  this.age = user_object.age
  this.trips = user_object.trips
}

User.prototype.formatIndex = () => {
  let userHtml = `
    <h2>${this.name} </h2>
  `
  return userHtml
}
