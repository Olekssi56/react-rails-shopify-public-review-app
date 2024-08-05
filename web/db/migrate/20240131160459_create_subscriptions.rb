# frozen_string_literal: true

class CreateSubscriptions < ActiveRecord::Migration[7.1]
  def change
    create_table :subscriptions do |t|
      t.belongs_to(:shop, foreign_key: true, index: true)
      t.belongs_to(:plan, foreign_key: true, index: true, null: false)

      t.bigint(:shopify_id)
      t.string(:name, null: false)
      t.datetime(:current_period_end)
      t.string(:status, null: false)
      t.boolean(:test, null: false, default: false)
      t.integer(:trial_days, null: false, default: 0)
      t.string(:app_usage_line_item_id)
      t.decimal(:app_usage_capped_amount)
      t.decimal(:app_usage_balanced_used)

      t.timestamps
    end
  end
end
