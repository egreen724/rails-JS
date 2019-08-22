# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#[#<Activity id: 1, name: "Blood Mountain", distance: 4.3, street_address: "Byron Reece Memorial Trail", city: "Blairsville", state: "GA", zip_code: 30512, category: "Hike", difficulty_rating: 3, parking: true, creator_id: 1>, #<Activity id: 2, name: "Stone Mountain", distance: 1.0, street_address: "123 Stone Mountain Park", city: "Stone Mountain", state: "GA", zip_code: 30309, category: "Hike", difficulty_rating: 1, parking: true, created_at: "2019-08-15 21:39:30", updated_at: "2019-08-15 21:39:30", creator_id: 1>, #<Activity id: 3, name: "Silver Comet Trail", distance: 40.0, street_address: "", city: "", state: "GA", zip_code: 30306, category: "Bike Ride", difficulty_rating: 2, parking: true, created_at: "2019-08-17 20:13:58", updated_at: "2019-08-17 20:13:58", creator_id: 3>]

users = User.create(
  [{
    name: "Audre",
    email: "audre_green@yahoo.com",
    password_digest: "test",
    bio: "Outdoorswoman",
    age: "28"
  }]
)

activities = Activity.create(
  [{
    name: "Blood Mountain",
    distance: 4.3 ,
    street_address: "Byron Reece Memorial Trail",
    city: "Blairsville",
    state: "GA",
    zip_code: 30512,
    category: "Hike",
    difficulty_rating: 3,
    parking: true,
    creator_id: 1
    }]
)
