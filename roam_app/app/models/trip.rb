class Trip < ApplicationRecord
  belongs_to :user
  belongs_to :activity

  # validates :time_ellapsed, :numericality => { :greater_than_or_equal_to => 0}

  def to_hours
    if self.time_ellapsed
      if self.time_ellapsed > 60
       time = "#{self.time_ellapsed/60} hours"
      else
       time = "#{self.time_ellapsed} minutes"
      end
      time
    end
  end

end
