# frozen_string_literal: true

class AddPlans < ActiveRecord::Migration[7.1]
  def up
    plans = [
      {
        name: 'Free',
        description: nil,
        price: 0,
        interval: 'month',
        display_index: 1,
      },
      {
        name: 'Standard',
        description: nil,
        price: 50,
        interval: 'month',
        recommended: true,
        display_index: 2,
      },
    ]

    plans.each do |plan|
      Plan.create!(plan)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
