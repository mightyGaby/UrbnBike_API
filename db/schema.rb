# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150604194316) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bikeracks", force: :cascade do |t|
    t.string   "address"
    t.string   "neighborhood"
    t.string   "lat"
    t.string   "lng"
    t.string   "location"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "bikerack_id"
    t.integer  "warning_id"
    t.string   "text"
    t.datetime "date_added"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "warnings", force: :cascade do |t|
    t.datetime "date_added"
    t.integer  "warning_type", default: 4
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

end
