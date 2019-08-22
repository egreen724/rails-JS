class TripSerializer < ActiveModel::Serializer
  attributes :id  

  belongs_to :user
  belongs_to :activity
end
