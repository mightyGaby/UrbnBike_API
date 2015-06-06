class Warning < ActiveRecord::Base
  belongs_to :bikerack
  belongs_to :user
  has_one :comment

  enum warning_type: [ :bandit, :pothole, :crowded, :traffic, :narrow, :ok ]

  def method_name

  end
end
