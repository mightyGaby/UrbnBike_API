class CreateWarnings < ActiveRecord::Migration
  def change
    create_table :warnings do |t|
      t.datetime :date_added
      t.integer :warning_type, default: 4
      t.timestamps null: false
    end
  end
end
