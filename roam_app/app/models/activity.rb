class Activity < ApplicationRecord
  has_many :trips
  has_many :users, through: :trips
  belongs_to :creator, class_name: :User, foreign_key: :creator_id
  has_many :activity_keywords
  has_many :keywords, through: :activity_keywords
  accepts_nested_attributes_for :keywords, reject_if: :keyword_name_blank

  validates :distance, presence: true, :numericality => { :greater_than_or_equal_to => 0}
  validates :state, presence: true
  validates :zip_code, numericality: true
  validates :name, presence: true 

  def self.state_filter(state_input)
    where(state: state_input)
  end

  def self.keyword_filter(keyword_input)
    Activity.joins(:keywords).where("keyword_id = ?", keyword_input)
    #includes(keywords: :id).where(id: keyword_input)
  end

  def self.category_filter(category_input)
    where(category: category_input)
  end

  def self.greater_than_ten
    where("distance >= 10")
  end

  def self.five_to_ten
    where("distance >= 5 AND distance < 10")
  end

  def self.two_to_five
    where("distance >= 2 AND distance < 5")
  end

  def self.less_than_two
    where("distance < 2")
  end

  def keywords_attributes=(keyword_attributes)
    keyword_attributes.values.each do |keyword_attribute|
      keyword = Keyword.find_or_create_by(keyword_attribute)
      self.keywords << keyword unless keyword_name_blank(keyword_attribute)
    end
  end

  def comments
    all = []

    if self.trips != []
      self.trips.collect do |trip|
        all << trip.comment
       end
     all.reject! {|item| item.nil? || item == "" }
   end
   all
  end

  def keyword_name_blank(attributes)
    attributes.all? do |key, value|
      key == '_destroy' || value.blank? || value.is_a?(Hash) && all_blank?(value)
    end
  end

end
