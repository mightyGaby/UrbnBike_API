class Bikerack < ActiveRecord::Base
  has_many :comments
  has_many :warnings

  after_save :save_json

  def bikerack
    @bikerack
  end

  def save_json
    content = Bikerack.all.to_json
    puts content
    File.open('../../bikeracks.json', "w+") do |f|
      f.write(content)
      puts "data updated!"
    end
    puts "total bikeracks: #{Bikerack.count}"
  end

end
