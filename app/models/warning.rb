class Warning < ActiveRecord::Base
  belongs_to :bikerack
  has_one :comment

  enum warning_type: [ :pothole, :bandit, :construction, :crowded, :ok ]
end
