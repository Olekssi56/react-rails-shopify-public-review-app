# frozen_string_literal: true

class CreatePlans < ActiveRecord::Migration[7.1]
  def change
    create_enum :plan_intervals,
                %w(
                  month
                  year
                )

    create_table :plans do |t|
      t.string(:name, index: true, null: false)
      t.string(:description)
      t.string(:note)
      t.decimal(:price, default: 0.0, null: false, precision: 10, scale: 2)
      t.integer(:discount, null: false, default: 0)
      t.string(:currency, null: false, default: 'usd')
      t.enum(:interval, enum_type: :plan_intervals, null: false)
      t.integer(:trial_days, null: false, default: 0)
      t.boolean(:recommended, null: false, default: false)
      t.boolean(:active, null: false, default: false)
      t.decimal(:app_usage_price)
      t.string(:app_usage_terms)
      t.decimal(:app_usage_capped_amount)
      t.integer(:display_index, null: false, default: 1)
      # Configuration

      t.timestamps
    end

    add_index(:plans, [:name, :interval], unique: true)
  end
end
