class Comment < ActiveRecord::Base
  belongs_to :bikerack
  belongs_to :user
  belongs_to :warning
end
