class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :user, index: true
      t.integer :bikerack_id
      t.integer :warning_id
      t.string :text
      t.datetime :date_added
      t.timestamps null: true
    end

  end
end
