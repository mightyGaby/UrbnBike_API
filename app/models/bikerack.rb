class Bikerack < ActiveRecord::Base
  has_many :comments
  has_many :warnings

  def bikerack
    @bikerack
  end
end
