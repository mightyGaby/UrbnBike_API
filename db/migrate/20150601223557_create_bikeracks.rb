class CreateBikeracks < ActiveRecord::Migration
  def change
    create_table :bikeracks do |t|
      t.string :address
      t.string :neighborhood
      t.string :lat
      t.string :lng
      t.string :location
      t.timestamps null: true
    end
  end
end
