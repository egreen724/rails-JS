class User < ApplicationRecord
  has_many :trips
  has_many :activities, through: :trips
  has_many :creations, :class_name => "Activity", :foreign_key => "creator_id"
  

end
