# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_31_160459) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "plan_intervals", ["month", "year"]

  create_table "data_migrations", primary_key: "version", id: :string, force: :cascade do |t|
  end

  create_table "plan_features", force: :cascade do |t|
    t.bigint "plan_id", null: false
    t.string "name", null: false
    t.string "description", null: false
    t.boolean "active", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_plan_features_on_plan_id"
  end

  create_table "plans", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.string "note"
    t.decimal "price", precision: 10, scale: 2, default: "0.0", null: false
    t.integer "discount", default: 0, null: false
    t.string "currency", default: "usd", null: false
    t.enum "interval", null: false, enum_type: "plan_intervals"
    t.integer "trial_days", default: 0, null: false
    t.boolean "recommended", default: false, null: false
    t.boolean "active", default: false, null: false
    t.decimal "app_usage_price"
    t.string "app_usage_terms"
    t.decimal "app_usage_capped_amount"
    t.integer "display_index", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "interval"], name: "index_plans_on_name_and_interval", unique: true
    t.index ["name"], name: "index_plans_on_name"
  end

  create_table "shops", force: :cascade do |t|
    t.string "shopify_domain", null: false
    t.string "shopify_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "access_scopes"
    t.bigint "shopify_id"
    t.string "name"
    t.string "currency"
    t.string "timezone"
    t.string "customer_email"
    t.string "email"
    t.string "shopify_plan_name"
    t.string "shop_owner"
    t.string "address1"
    t.string "address2"
    t.string "city"
    t.string "province_code"
    t.string "zip"
    t.string "country_code"
    t.string "phone"
    t.index ["shopify_domain"], name: "index_shops_on_shopify_domain", unique: true
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "shop_id"
    t.bigint "plan_id", null: false
    t.bigint "shopify_id"
    t.string "name", null: false
    t.datetime "current_period_end"
    t.string "status", null: false
    t.boolean "test", default: false, null: false
    t.integer "trial_days", default: 0, null: false
    t.string "app_usage_line_item_id"
    t.decimal "app_usage_capped_amount"
    t.decimal "app_usage_balanced_used"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_subscriptions_on_plan_id"
    t.index ["shop_id"], name: "index_subscriptions_on_shop_id"
  end

  add_foreign_key "plan_features", "plans"
  add_foreign_key "subscriptions", "plans"
  add_foreign_key "subscriptions", "shops"
end
