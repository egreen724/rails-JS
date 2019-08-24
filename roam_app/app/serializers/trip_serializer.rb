class TripSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :user, :activity_id, :activity, :taken, :comment, :date, :time_ellapsed

  belongs_to :user
  belongs_to :activity
end
