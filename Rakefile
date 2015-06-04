# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)
require File.expand_path('../app/models/bikerack.rb', __FILE__)


Rails.application.load_tasks

namespace :db do

  desc "save all bikeracks to json file"
  task :export_data do
    content = Bikerack.all.to_json
    File.open('../../bikeracks.json', "w+") do |f|
      f.write(content)
    end

  end # task :export_data

  desc "delete test bikeracks from database"
  task :cleanup do
    bikeracks = Bikerack.all
    bikeracks.map do |bikerack|
      if bikerack.address == 'TEST'
        bikerack.destroy
      end
    end
  end #task :cleanup

end
