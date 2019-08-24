class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :city, :state, :distance 

  has_many :trips
  has_many :users, through: :trips
  #belongs_to :creator, class_name: :User, foreign_key: :creator_id
  has_many :activity_keywords
  has_many :keywords, through: :activity_keywords
end
