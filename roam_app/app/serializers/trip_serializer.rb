class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :user, :activity_id, :activity, :taken

  belongs_to :user
  belongs_to :activity
end
