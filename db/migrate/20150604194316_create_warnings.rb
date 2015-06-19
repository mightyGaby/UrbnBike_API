class CreateWarnings < ActiveRecord::Migration
  def change
    create_table :warnings do |t|
      t.belongs_to :bikerack, index: true
      t.integer :warning_typeasterh, default: 5
      t.timestamps null: false
    end
  end
end
